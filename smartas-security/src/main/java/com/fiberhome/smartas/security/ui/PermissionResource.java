/**
 * 
 */
package com.fiberhome.smartas.security.ui;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.util.ReflectionUtils;
import org.springframework.util.ReflectionUtils.MethodCallback;
import org.springframework.util.ReflectionUtils.MethodFilter;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseResource;
import com.fiberhome.smartas.security.Permission;
import com.fiberhome.smartas.security.service.PermissionService;

/**
 * @author chenb
 *
 */
@Path("/security/permission")
@Resource(code = 1003, model = "Smart", desc = "Permission Resource")
public class PermissionResource extends BaseResource<Permission> implements InitializingBean {

  @Autowired
  private PermissionService service;

  @Autowired
  private ApplicationContext applicationContext;

  private List<Permission> perms;

  protected PermissionService getService() {
    return service;
  }

  public void afterPropertiesSet() throws Exception {
    Map<String, Object> beans = applicationContext.getBeansWithAnnotation(Resource.class);
    final Set<Permission> perms = new HashSet<Permission>();
    for (Object bean : beans.values()) {
      Class<?> clazz = bean.getClass();
      final Resource resource = AnnotationUtils.getAnnotation(clazz, Resource.class);

      Permission perm = new Permission();
      perm.setId(resource.model());
      perm.setDesc(resource.model());
      perms.add(perm);

      perm = new Permission();
      perm.setId(String.valueOf(resource.code()));
      perm.setParentId(resource.model());
      perm.setDesc(resource.desc());
      perms.add(perm);
      ReflectionUtils.doWithMethods(clazz, new MethodCallback() {
        public void doWith(Method method) throws IllegalArgumentException, IllegalAccessException {
          Operation operation = AnnotationUtils.findAnnotation(method, Operation.class);
          Permission perm = new Permission();
          perm.setId(resource.code() + "." + operation.code());
          perm.setParentId(String.valueOf(resource.code()));
          perm.setDesc(operation.desc());
          perms.add(perm);
        }
      }, OPERATION_HANDLER_METHODS);
    }
    this.perms = new ArrayList<Permission>(perms);
    Collections.sort(this.perms, new Comparator<Permission>() {

      public int compare(Permission o1, Permission o2) {
        return o1.getId().compareTo(o2.getId());
      }

    });
  }

  @GET
  @Path(value = "/scan")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public List<Permission> scan() {
    return perms;
  }

  public static final MethodFilter OPERATION_HANDLER_METHODS = new MethodFilter() {
    public boolean matches(Method method) {
      return (AnnotationUtils.findAnnotation(method, Operation.class) != null);
    }
  };

  @GET
  @Path(value = "/role/{id}")
  @Operation(code = 3002, desc = "Role Permissions")
  public String[] getPermissions(@PathParam("id") long id) {
    return service.getPermissionsByRoleId(id);
  }

  @POST
  @Path(value = "/role/{id}")
  @Operation(code = 3002, desc = "Role Permissions")
  public void savePermissions(@PathParam("id") long roleId, String[] ids) {
    service.updatePermissions(roleId, ids);
  }

}
