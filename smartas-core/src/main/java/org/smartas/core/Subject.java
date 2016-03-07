/**
 * 
 */
package org.smartas.core;

import java.io.Serializable;
import java.util.List;

/**
 * 当前登录用户
 * 
 * @author chenb
 *
 */
public interface Subject {
  
  public static final String SUBJECT = Subject.class.getName() + ".SUBJECT";

  Object getPrincipal();

  List<Serializable> getRoles();

  /**
   * 角色合并
   * 
   * @return
   */
  boolean isRoleMerged();

  /**
   * 当前登录角色
   * 
   * @return
   */
  Serializable getCurrentRole();

  String getHost();

  boolean isPermitted(Serializable permission);
}
