/*
 * Copyright (c) 2013-2016 University of Maryland
 * Created by: Xi Yang 2016

 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and/or hardware specification (the “Work”) to deal in the 
 * Work without restriction, including without limitation the rights to use, 
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of 
 * the Work, and to permit persons to whom the Work is furnished to do so, 
 * subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Work.

 * THE WORK IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE WORK OR THE USE OR OTHER DEALINGS  
 * IN THE WORK.
 */


package net.maxgigapop.mrs.driver.opendaylight;

import com.hp.hpl.jena.ontology.OntModel;
import java.util.UUID;
import java.util.concurrent.Future;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.AsyncResult;
import javax.ejb.Asynchronous;
import javax.ejb.EJBException;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import net.maxgigapop.mrs.bean.DriverInstance;
import net.maxgigapop.mrs.bean.DriverModel;
import net.maxgigapop.mrs.bean.DriverSystemDelta;
import net.maxgigapop.mrs.bean.VersionItem;
import net.maxgigapop.mrs.bean.persist.DeltaPersistenceManager;
import net.maxgigapop.mrs.bean.persist.DriverInstancePersistenceManager;
import net.maxgigapop.mrs.bean.persist.ModelPersistenceManager;
import net.maxgigapop.mrs.bean.persist.VersionItemPersistenceManager;
import net.maxgigapop.mrs.driver.IHandleDriverSystemCall;


@Stateless
public class OpenflowRestconfDriver implements IHandleDriverSystemCall{       
    Logger logger = Logger.getLogger(OpenflowRestconfDriver.class.getName());
    String fakeMap="";
    //String requests="";
    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)

    public void propagateDelta(DriverInstance driverInstance, DriverSystemDelta aDelta) {
        driverInstance = DriverInstancePersistenceManager.findById(driverInstance.getId());
        aDelta = (DriverSystemDelta) DeltaPersistenceManager.findById(aDelta.getId());
        String modelBase = driverInstance.getHeadVersionItem().getModelRef().getTtlModel();        
        String modelAdd = aDelta.getModelAddition().getTtlModel();
        String modelReduc = aDelta.getModelReduction().getTtlModel();
        
        OpenflowPush push = new OpenflowPush();
        String requests = null;
        requests = push.propagate(modelBase, modelAdd, modelReduc);
        String requestId = driverInstance.getId().toString() + aDelta.getId().toString();
        driverInstance.putProperty(requestId, requests);
        DriverInstancePersistenceManager.merge(driverInstance);
        Logger.getLogger(OpenflowRestconfDriver.class.getName()).log(Level.INFO, "ODL OpenflowRestconfDriver delta models succesfully propagated");
    }

    @Override
    @Asynchronous
    public Future<String> commitDelta(DriverSystemDelta aDelta) {
        DriverInstance driverInstance = aDelta.getDriverInstance();
        if (driverInstance == null) {
            throw new EJBException(String.format("commitDelta see null driverInance for %s", aDelta));
        }
        String loginUser = driverInstance.getProperty("loginUser");
        String loginPass = driverInstance.getProperty("loginPass");
        String topologyURI = driverInstance.getProperty("topologyUri");
        
        //Searches for subsystemBaseUrl in Driver Instance
        String subsystemBaseUrl = driverInstance.getProperty("subsystemBaseUrl");
        if (subsystemBaseUrl == null || loginUser == null || loginPass ==null || topologyURI == null) {
            throw new EJBException(String.format("%s misses one of the property keys {subsystemBaseUrlm, loginUser, loginPass, topologyUri}", driverInstance));
        }
        String requestId = driverInstance.getId().toString() + aDelta.getId().toString();
        String requests = driverInstance.getProperty(requestId);

        OpenflowPush push = new OpenflowPush();
        try {
            push.commit(loginUser, loginPass, requests, subsystemBaseUrl);
        } catch (Exception ex) {
            Logger.getLogger(OpenflowRestconfDriver.class.getName()).log(Level.SEVERE, null, ex);
            throw(new EJBException(ex));
        }
        driverInstance.getProperties().remove(requestId);
        DriverInstancePersistenceManager.merge(driverInstance);
        Logger.getLogger(OpenflowRestconfDriver.class.getName()).log(Level.INFO, "ODL OpenflowRestconfDriver delta models succesfully commited");
        return new AsyncResult<String>("SUCCESS");
    }
    
    @Override
    @Asynchronous
    @SuppressWarnings("empty-statement")
    public Future<String> pullModel(Long driverInstanceId) {
        DriverInstance driverInstance = DriverInstancePersistenceManager.findById(driverInstanceId);
        if (driverInstance == null) {
            throw new EJBException(String.format("pullModel cannot find driverInance(id=%d)", driverInstanceId));
        }
        try {
            String loginUser = driverInstance.getProperty("loginUser");
            String loginPass = driverInstance.getProperty("loginPass");
            String topologyURI = driverInstance.getProperty("topologyUri");
            String subsystemBaseUrl = driverInstance.getProperty("subsystemBaseUrl");

            if (subsystemBaseUrl == null) {
                throw new EJBException(String.format("%s has no property key=subsystemBaseUrl", driverInstance));
            }

            // Creates an Ontology Model from ODL controller RESTConf
            OntModel ontModel = OpenflowModelBuilder.createOntology(topologyURI, subsystemBaseUrl, loginUser, loginPass);

            if (driverInstance.getHeadVersionItem() == null || !driverInstance.getHeadVersionItem().getModelRef().getOntModel().isIsomorphicWith(ontModel)) {
                DriverModel dm = new DriverModel();
                dm.setCommitted(true);
                dm.setOntModel(ontModel);
                ModelPersistenceManager.save(dm);
                VersionItem vi = new VersionItem();
                vi.setModelRef(dm);
                vi.setReferenceUUID(UUID.randomUUID().toString());
                vi.setDriverInstance(driverInstance);
                VersionItemPersistenceManager.save(vi);
                driverInstance.setHeadVersionItem(vi);
            }
        } catch (Exception ex) {
            Logger.getLogger(OpenflowRestconfDriver.class.getName()).log(Level.SEVERE, ex.getMessage());
            if (ex instanceof EJBException) {
                throw (EJBException)ex;
            } else {
                throw (new EJBException(ex));
            }
        }

        return new AsyncResult<>("SUCCESS");
    }

}
