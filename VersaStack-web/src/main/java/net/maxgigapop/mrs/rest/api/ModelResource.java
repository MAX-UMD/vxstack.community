/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.maxgigapop.mrs.rest.api;

<<<<<<< HEAD
=======
import com.hp.hpl.jena.ontology.OntModel;
import java.io.StringWriter;
>>>>>>> upstream/CoWork-ONOS-xyang
import java.util.UUID;
import javax.ejb.EJB;
import javax.ejb.EJBException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
<<<<<<< HEAD
import javax.ws.rs.NotFoundException;
=======
>>>>>>> upstream/CoWork-ONOS-xyang
import javax.ws.rs.POST;
import net.maxgigapop.mrs.bean.ModelBase;
import net.maxgigapop.mrs.bean.VersionGroup;
import net.maxgigapop.mrs.bean.persist.VersionGroupPersistenceManager;
import net.maxgigapop.mrs.common.ModelUtil;
import net.maxgigapop.mrs.rest.api.model.ApiModelBase;
import net.maxgigapop.mrs.system.HandleSystemCall;
<<<<<<< HEAD
=======
import net.maxgigapop.mrs.common.ModelUtil;
import net.maxgigapop.mrs.rest.api.model.ApiModelViewRequest;
>>>>>>> upstream/CoWork-ONOS-xyang

/**
 * REST Web Service
 *
 * @author max
 */
@Path("model")
@RequestScoped
public class ModelResource {

    @Context
    private UriInfo context;
    
    @EJB
    HandleSystemCall systemCallHandler;

    /**
     * Creates a new instance of ModelResource
     */
    public ModelResource() {
    }

    /**
     * Retrieves representation of an instance of net.maxgigapop.mrs.rest.api.ModelResource
     * @return an instance of java.lang.String
     */
    @GET
<<<<<<< HEAD
    @Produces({"application/xml", "application/json"})
=======
    @Produces("application/xml")
    @Path("/{refUUID}")
    public ApiModelBase pullXml(@PathParam("refUUID") String refUUID) throws Exception{
        VersionGroup vg = VersionGroupPersistenceManager.findByReferenceId(refUUID);
        ModelBase modelBase = systemCallHandler.retrieveVersionGroupModel(refUUID);
        ApiModelBase apiModelBase = new ApiModelBase();
        apiModelBase.setId(modelBase.getId());
        apiModelBase.setVersion(refUUID);
        apiModelBase.setCreationTime(modelBase.getCreationTime());
        apiModelBase.setStatus(vg.getStatus());
        apiModelBase.setTtlModel(ModelUtil.marshalOntModel(modelBase.getOntModel()));
        return apiModelBase;
    }
    
    @GET
    @Produces("application/json")
>>>>>>> upstream/CoWork-ONOS-xyang
    @Path("/{refUUID}")
    public ApiModelBase pull(@PathParam("refUUID") String refUUID) throws Exception{
        VersionGroup vg = VersionGroupPersistenceManager.findByReferenceId(refUUID);
//        if (vg == null) {
//           throw new EJBException(String.format("retrieveVersionModel cannot find a VG with refUuid=%s", refUUID));
//        }
        ModelBase modelBase = systemCallHandler.retrieveVersionGroupModel(refUUID);
//        ModelBase modelBase = new ModelBase();
//        try{
//            modelBase= systemCallHandler.retrieveVersionGroupModel(refUUID);
//        }catch(Exception e){
//            throw new NotFoundException("Not Found");
//        }        
        ApiModelBase apiModelBase = new ApiModelBase();
        apiModelBase.setId(modelBase.getId());
        apiModelBase.setVersion(refUUID);
        apiModelBase.setCreationTime(modelBase.getCreationTime());
        apiModelBase.setStatus(vg.getStatus());        
        apiModelBase.setTtlModel(ModelUtil.marshalOntModel(modelBase.getOntModel()));
        return apiModelBase;
    }

    /**
     * PUT method for updating or creating an instance of ModelResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Produces({"application/xml", "application/json"})
    @Path("/{refUUID}")
    public ApiModelBase update(@PathParam("refUUID") String refUUID) throws Exception{
        systemCallHandler.updateHeadVersionGroup(refUUID);
        return this.pull(refUUID);
    }

    @GET
    @Produces({"application/xml", "application/json"})
    public ApiModelBase creatHeadVersionGroup() throws Exception{
        VersionGroup vg = systemCallHandler.createHeadVersionGroup(UUID.randomUUID().toString());
        return this.pull(vg.getRefUuid());
    }
    
    @GET
    @Path("/systeminstance")
    @Produces({"application/xml","application/json"})
    public String push(){
        return systemCallHandler.createInstance().getReferenceUUID();
    }
    
    @DELETE
    @Path("/systeminstance/{refUUID}")
    public String terminate(@PathParam("refUUID") String refUUID){
        try{
            systemCallHandler.terminateInstance(refUUID);
            return "Successfully terminated";
        }catch(EJBException e){
            return(e.getMessage());
        }
    }

    
    @POST
    @Consumes({"application/xml","application/json"})
    @Produces("application/xml")
    @Path("/view/{refUUID}")
    public ApiModelBase queryView(@PathParam("refUUID")String refUUID, ApiModelViewRequest viewRequest) throws Exception{
        OntModel ontModel = systemCallHandler.queryModelView(refUUID, viewRequest.getFilters());
        if (ontModel == null) {
            throw new EJBException("systemCallHandler.queryModelView return null model."); 
        }
        ApiModelBase apiModelBase = new ApiModelBase();
        apiModelBase.setVersion(refUUID);
        java.util.Date now = new java.util.Date();
        apiModelBase.setCreationTime(new java.sql.Date(now.getTime()));
        apiModelBase.setTtlModel(ModelUtil.marshalOntModel(ontModel));
        return apiModelBase;
    }

    
    @POST
    @Consumes({"application/xml","application/json"})
    @Produces({"application/json"})
    @Path("/view/{refUUID}")
    public ApiModelBase queryViewJson(@PathParam("refUUID")String refUUID, ApiModelViewRequest viewRequest) throws Exception{
        OntModel ontModel = systemCallHandler.queryModelView(refUUID, viewRequest.getFilters());
        if (ontModel == null) {
            throw new EJBException("systemCallHandler.queryModelView return null model."); 
        }
        ApiModelBase apiModelBase = new ApiModelBase();
        apiModelBase.setVersion(refUUID);
        java.util.Date now = new java.util.Date();
        apiModelBase.setCreationTime(new java.sql.Date(now.getTime()));
        apiModelBase.setTtlModel(ModelUtil.marshalOntModelJson(ontModel));
        return apiModelBase;
    }
}
