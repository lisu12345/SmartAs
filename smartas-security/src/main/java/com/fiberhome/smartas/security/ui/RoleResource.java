/**
 * 
 */
package com.fiberhome.smartas.security.ui;

import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseResource;
import com.fiberhome.smartas.security.Role;
import com.fiberhome.smartas.security.service.RoleService;

/**
 * @author chenb
 *
 */
@Path("/security/role")
@Resource(code = 1002, model = "Smart", desc = "Role Resource")
public class RoleResource extends BaseResource<Role> {
  @Autowired
  private RoleService service;

  protected RoleService getService() {
    return service;
  }

  /*
   * @RequestMapping(value = "/navbar", method = RequestMethod.GET)
   * 
   * @Operation(code = Operation.READ, desc = Operation.READ_DESC) public List<Menu> navbar(Model
   * model) { // 预处理数据，去除父未发布的所有子 List<Menu> list = service.findNavbarMenus();
   * 
   * return list; }
   */

}
