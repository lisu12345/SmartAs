/**
 * 
 */
package org.smartas.devops.generator;

import java.util.ArrayList;
import java.util.List;

/**
 * @author chenb
 *
 */
public class Tpl {
  public static List<Tpl> tpls = new ArrayList<Tpl>();

  static {
    tpls.add(new Tpl("VO.ftl", "java/%s/%s.java"));
    tpls.add(new Tpl("Dao.ftl", "java/%s/dao/%sDao.java"));
    tpls.add(new Tpl("DaoXml.ftl", "resources/%s/dao/%sDao.xml"));
    tpls.add(new Tpl("Service.ftl", "java/%s/service/%sService.java"));
    tpls.add(new Tpl("ServiceImpl.ftl", "java/%s/service/impl/%sServiceImpl.java"));
    tpls.add(new Tpl("UI.ftl", "java/%s/ui/%sUI.java"));
  }

  private final String tpl;

  private final String path;

  public Tpl(String tpl, String path) {
    super();
    this.tpl = tpl;
    this.path = path;
  }

  /**
   * @return the tpl
   */
  public String getTpl() {
    return tpl;
  }

  /**
   * @return the path
   */
  public String getPath() {
    return path;
  }
}
