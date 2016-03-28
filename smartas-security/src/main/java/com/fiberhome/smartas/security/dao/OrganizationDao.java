package com.fiberhome.smartas.security.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.smartas.core.BaseDao;
import com.fiberhome.smartas.security.Organization;


@Repository
public interface OrganizationDao extends BaseDao<Organization> {

  public int getByName(@Param("orgName") String orgName);

}
