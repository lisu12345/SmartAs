/**
 * 
 */
package org.smartas.core;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;

/**
 * @author chenb
 *
 */
public class Environment implements BeanFactoryAware {

  /**
   * 应用名称
   */
  private String appName;
  /**
   * 数据名称
   */
  private String dbName;
  
  /**
   * 表前缀名
   */
  private String tablePrefix;
  /**
   * 
   */
  private String scope;

  /**
   * @return the appName
   */
  public String getAppName() {
    return appName;
  }

  /**
   * @param appName the appName to set
   */
  public void setAppName(String appName) {
    this.appName = appName;
  }

  /**
   * @return the dbName
   */
  public String getDbName() {
    return dbName;
  }

  /**
   * @param dbName the dbName to set
   */
  public void setDbName(String dbName) {
    this.dbName = dbName;
  }

  /**
   * @return the scope
   */
  public String getScope() {
    return scope;
  }

  /**
   * @param scope the scope to set
   */
  public void setScope(String scope) {
    this.scope = scope;
  }

  /**
   * @return the tablePrefix
   */
  public String getTablePrefix() {
    return tablePrefix;
  }

  /**
   * @param tablePrefix the tablePrefix to set
   */
  public void setTablePrefix(String tablePrefix) {
    this.tablePrefix = tablePrefix;
  }



  private static Environment evn;

  public static Environment getEvn() {
    return evn;
  }

  public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
    evn = beanFactory.getBean(Environment.class);
  }


}
