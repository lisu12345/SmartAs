package com.fiberhome.smartas.security.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.smartas.core.service.BaseServiceImpl;
import com.fiberhome.smartas.security.Organization;
import com.fiberhome.smartas.security.dao.OrganizationDao;
import com.fiberhome.smartas.security.service.OrganizationService;


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
