package com.fiberhome.smartas.security.service;

import com.fiberhome.smartas.core.BaseService;
import com.fiberhome.smartas.security.Organization;

public interface OrganizationService extends BaseService<Organization> {

  public int getByName(String orgName);

}
