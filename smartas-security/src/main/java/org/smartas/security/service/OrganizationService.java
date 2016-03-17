package org.smartas.security.service;

import org.smartas.core.BaseService;
import org.smartas.security.Organization;

public interface OrganizationService extends BaseService<Organization>{
  
  public int getByName(String orgName);

}
