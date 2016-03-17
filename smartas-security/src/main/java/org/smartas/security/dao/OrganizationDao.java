package org.smartas.security.dao;

import org.apache.ibatis.annotations.Param;
import org.smartas.core.BaseDao;
import org.smartas.security.Organization;
import org.springframework.stereotype.Repository;


@Repository
public interface OrganizationDao extends BaseDao<Organization>{
  
  public int getByName(@Param("orgName") String orgName);

}
