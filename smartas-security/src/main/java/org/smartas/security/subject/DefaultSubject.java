/**
 * 
 */
package org.smartas.security.subject;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import org.smartas.core.Subject;

/**
 * @author chenb
 *
 */
public class DefaultSubject implements Subject, Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 8875138309999956798L;

  private final String host;
  private final List<Serializable> roles;
  private final Set<Serializable> permissions;
  private final Object principal;

  public DefaultSubject(String host, List<Serializable> roles, Set<Serializable> permissions,
      Object principal) {
    super();
    this.host = host;
    this.roles = roles;
    this.permissions = permissions;
    this.principal = principal;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.smartas.core.Subject#getPrincipal()
   */
  @Override
  public Object getPrincipal() {
    return principal;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.smartas.core.Subject#getRoles()
   */
  @Override
  public List<Serializable> getRoles() {
    return roles;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.smartas.core.Subject#isRoleMerged()
   */
  @Override
  public boolean isRoleMerged() {
    return true;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.smartas.core.Subject#getCurrentRole()
   */
  @Override
  public Serializable getCurrentRole() {
    return null;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.smartas.core.Subject#isPermitted(java.io.Serializable)
   */
  @Override
  public boolean isPermitted(Serializable permission) {
    return permissions.contains(permission);
  }


  public String getHost() {
    return this.host;
  }

}
