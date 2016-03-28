/**
 * 
 */
package com.fiberhome.smartas.security.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseResource;
import com.fiberhome.smartas.security.User;
import com.fiberhome.smartas.security.service.UserService;

/**
 * @author chenb
 *
 */
@Path("/security/user")
@Resource(code = 1000, model = "Smart", desc = "User Resource")
public class UserResource extends BaseResource<User> {

  @Autowired
  private UserService userService;

  protected UserService getService() {
    return userService;
  }

  @GET
  @Path(value = "/index")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public String index() {
    return null;
  }

}
