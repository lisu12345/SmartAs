/*
 * 
 * 创建日期：2010-4-16 上午09:28:23
 *
 * 创 建 人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package com.fiberhome.smartas.security.ui;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.smartas.core.Subject;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.util.Constants;
import com.fiberhome.smartas.security.AjaxLoginResult;
import com.fiberhome.smartas.security.Credentials;
import com.fiberhome.smartas.security.LoginResult;
import com.fiberhome.smartas.security.User;
import com.fiberhome.smartas.security.service.PermissionService;
import com.fiberhome.smartas.security.service.RoleService;
import com.fiberhome.smartas.security.service.UserService;
import com.fiberhome.smartas.security.subject.DefaultSubject;

@Path("security")
@Resource(code = 1099, model = "Smart", desc = "Login Resource")
@Produces("application/json")
@Consumes("application/json")
public class LoginResource {

  @Autowired
  private UserService userService;

  @Autowired
  private RoleService roleService;

  @Autowired
  private PermissionService permissionService;


  @POST
  @Path(value = "login")
  public LoginResult login(@Context HttpServletRequest request, Credentials credentials) {
    User user = userService.findByUserAcount(StringUtils.trim(credentials.getUsername()));
    LoginResult result = new LoginResult();
    result.setContext(request.getContextPath());
    // System.out.println(DigestUtils.sha256Hex(credentials.getPassword()));
    if (user == null || !StringUtils.equals(DigestUtils.sha256Hex(credentials.getPassword()),
        user.getPassword())) {
      result.setStatus(400);
      return result;
    }
    String home = request.getHeader(Constants.X_REQUESTED_URL);

    List<Serializable> roles = roleService.findRoleByUserId(user.getId());
    Set<Serializable> permissions = permissionService.findPermissionsByUserId(user.getId());

    Subject subject = new DefaultSubject(request.getRemoteHost(), roles, permissions, user);
    request.getSession().setAttribute(Subject.SUBJECT, subject);
    result.setStatus(200);
    result.setHome(home);
    return result;
  }

  @POST
  @Path(value = "ajaxLogin")
  public AjaxLoginResult ajaxLogin(@Context HttpServletRequest request, Credentials credentials) {
    User user = userService.findByUserAcount(StringUtils.trim(credentials.getUsername()));
    AjaxLoginResult result = new AjaxLoginResult();
    result.setContext(request.getContextPath());
    // System.out.println(DigestUtils.sha256Hex(credentials.getPassword()));
    if (user == null || !StringUtils.equals(DigestUtils.sha256Hex(credentials.getPassword()),
        user.getPassword())) {
      result.setStatus(400);
      return result;
    }
    List<Serializable> roles = roleService.findRoleByUserId(user.getId());
    Set<Serializable> permissions = permissionService.findPermissionsByUserId(user.getId());

    Subject subject = new DefaultSubject(request.getRemoteHost(), roles, permissions, user);
    request.getSession().setAttribute(Subject.SUBJECT, subject);
    result.setStatus(200);
    result.setUser(user);
    return result;
  }

  @POST
  @Path(value = "logout")
  public void logout(@Context HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    if (session != null) {
      session.invalidate();
    }
    return;
  }

}
