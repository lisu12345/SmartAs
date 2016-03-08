package org.smartas.devops;

public class Module {

  private String project;
  
  private String packageName;
  
  private String url;
  
  private String name;
  
  private boolean indexPage;
  
  private String code;
  
  private String table;

  /**
   * @return the project
   */
  public String getProject() {
    return project;
  }

  /**
   * @param project the project to set
   */
  public void setProject(String project) {
    this.project = project;
  }

  /**
   * @return the packageName
   */
  public String getPackageName() {
    return packageName;
  }

  /**
   * @param packageName the packageName to set
   */
  public void setPackageName(String packageName) {
    this.packageName = packageName;
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
   * @return the indexPage
   */
  public boolean isIndexPage() {
    return indexPage;
  }

  /**
   * @param indexPage the indexPage to set
   */
  public void setIndexPage(boolean indexPage) {
    this.indexPage = indexPage;
  }

  /**
   * @return the code
   */
  public String getCode() {
    return code;
  }

  /**
   * @param code the code to set
   */
  public void setCode(String code) {
    this.code = code;
  }

  /**
   * @return the url
   */
  public String getUrl() {
    return url;
  }

  /**
   * @param url the url to set
   */
  public void setUrl(String url) {
    this.url = url;
  }

  /**
   * @return the table
   */
  public String getTable() {
    return table;
  }

  /**
   * @param table the table to set
   */
  public void setTable(String table) {
    this.table = table;
  }
}
