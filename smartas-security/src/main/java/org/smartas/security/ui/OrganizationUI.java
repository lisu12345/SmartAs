package org.smartas.security.ui;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.security.Organization;
import org.smartas.security.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/security/org")
@Resource(code = 6001, model = "FitOA", desc = "Demo UI")
public class OrganizationUI extends BaseUI<Organization> {
  
  @Autowired
  OrganizationService organizationService;
  
  @Override
  protected OrganizationService getService() {
    return organizationService;
  }
  
  @RequestMapping(value = "/getByName", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public String getByName(String orgName) {
    int qResult = getService().getByName(orgName);
    return (qResult + "");
  }

}
