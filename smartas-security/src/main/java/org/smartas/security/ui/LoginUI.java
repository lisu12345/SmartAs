/*
 * 
 * 创建日期：2010-4-16 上午09:28:23
 *
 * 创 建 人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package org.smartas.security.ui;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.smartas.core.Subject;
import org.smartas.core.annotation.Resource;
import org.smartas.core.util.Constants;
import org.smartas.security.AjaxLoginResult;
import org.smartas.security.Credentials;
import org.smartas.security.LoginResult;
import org.smartas.security.User;
import org.smartas.security.service.PermissionService;
import org.smartas.security.service.RoleService;
import org.smartas.security.service.UserService;
import org.smartas.security.subject.DefaultSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/security")
@Resource(code = 1099, model = "Smart", desc = "Login UI")
public class LoginUI {

  @Autowired
  private UserService userService;

  @Autowired
  private RoleService roleService;

  @Autowired
  private PermissionService permissionService;

  @RequestMapping(value = "/Index", method = RequestMethod.GET)
  public String index(Model model) {

    return null;
  }

  @RequestMapping(value = "/login", method = RequestMethod.POST)
  public LoginResult login(@RequestBody Credentials credentials, HttpServletRequest request) {
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

  @RequestMapping(value = "/ajaxLogin", method = RequestMethod.POST)
  public AjaxLoginResult ajaxLogin(@RequestBody Credentials credentials,
      HttpServletRequest request) {
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

  @RequestMapping(value = "/logout", method = RequestMethod.POST)
  public void logout(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    if (session != null) {
      session.invalidate();
    }
    return;
  }

}
