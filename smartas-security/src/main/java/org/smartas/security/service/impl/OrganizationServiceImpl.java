package org.smartas.security.service.impl;

import org.smartas.core.service.BaseServiceImpl;
import org.smartas.security.Organization;
import org.smartas.security.dao.OrganizationDao;
import org.smartas.security.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrganizationServiceImpl extends BaseServiceImpl<Organization>
    implements
      OrganizationService {

  @Autowired
  private OrganizationDao organizationDao;

  @Override
  protected OrganizationDao getDao() {
    return organizationDao;
  }

  @Override
  public int getByName(String orgName) {
    return organizationDao.getByName(orgName);
  }

}
