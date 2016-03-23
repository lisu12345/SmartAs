package org.smartas.security.service;

import org.smartas.security.Organization;

import com.fiberhome.smartas.core.BaseService;

public interface OrganizationService extends BaseService<Organization> {

  public int getByName(String orgName);

}
