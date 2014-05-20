/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.maxgigapop.mrs.bean;

import net.maxgigapop.mrs.bean.persist.PersistentEntity;
import com.hp.hpl.jena.ontology.OntModel;
import java.io.Serializable;
import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Lob;
import javax.persistence.PostLoad;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;


/**
 *
 * @author xyang
 */
@Entity
@Table(name = "model")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class ModelBase extends PersistentEntity implements Serializable {
    protected static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;
    protected java.sql.Date creationTime;
    protected Long cxtVersion = 0L;
    protected String cxtVersionTag = "";
    protected boolean committed = false;
    @Lob
    protected String ttlModel = "";
    @Transient
    protected OntModel ontModel = null;    

    public ModelBase() {
        java.util.Date now = new java.util.Date();
        this.creationTime = new java.sql.Date(now.getTime());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public String getCxtVersionTag() {
        return cxtVersionTag;
    }
    
    public Long getCxtVersion() {
        return cxtVersion;
    }

    public void setCxtVersion(Long cxtVersion) {
        this.cxtVersion = cxtVersion;
    }

    public void setCxtVersionTag(String cxtVersionTag) {
        this.cxtVersionTag = cxtVersionTag;
    }

    public boolean isCommitted() {
        return committed;
    }

    public void setCommitted(boolean committed) {
        this.committed = committed;
    }

    public String getTtlModel() {
        return ttlModel;
    }

    public void setTtlModel(String ttlModel) {
        this.ttlModel = ttlModel;
    }

    public OntModel getOntModel() {
        return ontModel;
    }

    public void setOntModel(OntModel ontModel) {
        this.ontModel = ontModel;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ModelBase)) {
            return false;
        }
        ModelBase other = (ModelBase) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "net.maxgigapop.mrs.model.MrsModel[ id=" + id + " ]";
    }
    
    @SuppressWarnings("unused")
    @PostLoad
    public void postLoad() {
        if (ttlModel.isEmpty())
            ontModel = null;
        else {
          try {
            ontModel = ModelUtil.unmarshalOntModel(ttlModel);
          } catch (Exception e) {
              // logging
              ontModel = null;
          }
        }
    }
    
    @SuppressWarnings("unused")
    @PrePersist
    @PreUpdate
    public void saveOrUpdate() {
        if (ontModel != null) {
            try {
                ttlModel = ModelUtil.marshalOntModel(ontModel);
            } catch (Exception e) {
              // logging
            }
         }
    }
}
