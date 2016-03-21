/**
 * 
 */
package com.fiberhome.smartas.devops.ui;

import java.io.File;
import java.io.FileFilter;
import java.io.FileWriter;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fiberhome.smartas.core.AppEnv;
import com.fiberhome.smartas.core.Pageable;
import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.ExceptionHandlerUI;
import com.fiberhome.smartas.core.util.StreamUtils;
import com.fiberhome.smartas.devops.Module;
import com.fiberhome.smartas.devops.Table;
import com.fiberhome.smartas.devops.generator.Project;
import com.fiberhome.smartas.devops.generator.Tpl;
import com.fiberhome.smartas.devops.generator.code.JavaBeanGenerator;
import com.fiberhome.smartas.devops.generator.config.IgnoredColumn;
import com.fiberhome.smartas.devops.generator.config.TableConfig;
import com.fiberhome.smartas.devops.generator.java.TopLevelClass;
import com.fiberhome.smartas.devops.generator.meta.IntrospectedTable;
import com.fiberhome.smartas.devops.service.DatabaseService;

import freemarker.template.Configuration;
import freemarker.template.Template;

/**
 * @author ftl
 *
 */
@Profile("dev")
@RestController()
@RequestMapping("/devops/generator")
@Resource(code = 1901, model = "Smart", desc = "Generator UI")
public class GeneratorUI extends ExceptionHandlerUI {
  private static final String[] IGNORED_COLUMNS = {"tenant_id", "app_name", "revision",
      "create_user_id", "last_update_user_id", "create_date", "last_update_date"};

  private static String PROJECT_FILE = ".project";

  @Autowired
  private DatabaseService service;

  @Autowired
  private AppEnv appEnv;
  @Autowired
  private Configuration devopsConfiguration;

  protected DatabaseService getService() {
    return service;
  }

  protected File getWebappDir() {
    File webAppDir = new File(getServletContext().getRealPath("/"));
    return webAppDir;
  }


  protected File getProjectRootDir() {
    File rootDir = getWebappDir();

    FileFilter filter = new FileFilter() {
      public boolean accept(File file) {
        return (file.getName().equalsIgnoreCase(PROJECT_FILE));
      }
    };
    while (rootDir != null) {
      File[] files = rootDir.listFiles(filter);
      if (files != null && files.length >= 1) {
        return files[0].getParentFile().getParentFile();
      }
      rootDir = rootDir.getParentFile();
    }
    return rootDir;
  }

  @RequestMapping(value = "/table/list/{page}/{pageSize}", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public Pageable<Table> getAll(@PathVariable("page") int page,
      @PathVariable("pageSize") int pageSize) {
    return service.getTable(appEnv.getDbName(), appEnv.getTablePrefix(), page, pageSize);
  }


  @RequestMapping(value = "/project/list", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public List<Project> listAll() {
    File projectRootDir = getProjectRootDir();
    List<Project> result = new ArrayList<>();
    FileFilter filter = new FileFilter() {
      public boolean accept(File file) {
        String name = file.getName();

        return file.isDirectory() && (name.startsWith(appEnv.getAppName()))
            && !name.endsWith("-lib") && !name.endsWith("-web");
      }
    };
    File[] projects = projectRootDir.listFiles(filter);
    if (projects != null) {
      for (File file : projects) {
        result.add(new Project(file.getName()));
      }
    }
    return result;
  }


  @RequestMapping(value = "/table/single", method = RequestMethod.POST)
  @Operation(code = Operation.CREATE, desc = Operation.CREATE_DESC)
  public Serializable cteate(@RequestBody Module entity) throws Exception {


    TableConfig config = new TableConfig();

    config.setCatalog(appEnv.getDbName());
    config.setSchema(appEnv.getDbName());
    config.setTableName(entity.getTable());

    for (String columnName : IGNORED_COLUMNS) {
      config.addIgnoredColumn(new IgnoredColumn(columnName));
    }

    List<IntrospectedTable> introspectTables = service.introspectTables(config);

    if (introspectTables.isEmpty()) {
      throw new RuntimeException();
    }

    JavaBeanGenerator beanGenerator = new JavaBeanGenerator();

    IntrospectedTable introspectTable = introspectTables.get(0);

    introspectTable.setBaseRecordType(entity.getPackageName() + "." + entity.getName());
    beanGenerator.setIntrospectedTable(introspectTable);
    TopLevelClass topLevelClass = beanGenerator.getCompilationUnits();

    File projectRootDir = getProjectRootDir();

    Map<String, Object> data = new HashMap<>();
    String moduleName = entity.getProject().substring(entity.getProject().lastIndexOf('-') + 1);
    data.put("entity", entity);
    data.put("moduleName", moduleName);
    data.put("scope", appEnv.getScope());
    data.put("beanInfo", topLevelClass);
    data.put("introspectTable", introspectTable);
    File projectFile = new File(projectRootDir, entity.getProject() + "/src/main/");

    String pkgPath = entity.getPackageName().replace(".", "/");
    for (Tpl t : Tpl.tpls) {
      Template tpl = devopsConfiguration.getTemplate(t.getTpl());
      File file = new File(projectFile, String.format(t.getPath(), pkgPath, entity.getName()));
      buildFile(tpl, file, data);
    }
    if (entity.isIndexPage()) {
      Template tpl = devopsConfiguration.getTemplate("Index.ftl");
      File file = new File(projectFile,
          String.format("resources/web/%s./%s.jsx", moduleName, entity.getName()));
      buildFile(tpl, file, data);
    }

    //if (entity != null) {
      //throw new RuntimeException();
    //}
    return true;
  }

  private void buildFile(Template tpl, File file, Map<String, Object> data) throws Exception {
    file.getParentFile().mkdirs();
    FileWriter out = new FileWriter(file);
    try {
      tpl.process(data, out);
    } finally {
      StreamUtils.close(out);
    }
  }

}
