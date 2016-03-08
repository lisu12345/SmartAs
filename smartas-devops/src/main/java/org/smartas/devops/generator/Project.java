/**
 * 
 */
package org.smartas.devops.generator;

/**
 * @author chenb
 *
 */
public class Project {

  private String name;

  private String[] packages;

  public Project() {

  }

  public Project(String name) {
    this.name = name;
  }

  public Project(String name, String[] packages) {
    this.name = name;
    this.packages = packages;
  }

  /**
   * @return the name
   */
  public String getName() {
    return name;
  }

  /**
   * @param name the name to set
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * @return the packages
   */
  public String[] getPackages() {
    return packages;
  }

  /**
   * @param packages the packages to set
   */
  public void setPackages(String[] packages) {
    this.packages = packages;
  }
}
