package com.fiberhome.smartas.security.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseResource;
import com.fiberhome.smartas.security.Organization;
import com.fiberhome.smartas.security.service.OrganizationService;

@Path("/security/org")
@Resource(code = 6001, model = "FitOA", desc = "Demo Resource")
public class OrganizationUI extends BaseResource<Organization> {

  @Autowired
  OrganizationService organizationService;

  @Override
  protected OrganizationService getService() {
    return organizationService;
  }

  @GET
  @Path(value = "/getByName")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public String getByName(String orgName) {
    int qResult = getService().getByName(orgName);
    return (qResult + "");
  }

}
