/**
 * 
 */
package org.smartas.devops.ui;

import java.io.File;
import java.io.FileFilter;
import java.io.FileWriter;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.smartas.core.AppEnv;
import org.smartas.core.Pageable;
import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.util.StreamUtils;
import org.smartas.devops.Module;
import org.smartas.devops.Table;
import org.smartas.devops.generator.Project;
import org.smartas.devops.generator.Tpl;
import org.smartas.devops.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.WebContentGenerator;

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
public class GeneratorUI extends WebContentGenerator {
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
         return file.isDirectory() && (file.getName().startsWith(appEnv.getAppName()));
       }
     };
     File[] projects = projectRootDir.listFiles(filter);
     if(projects != null){
       for(File file: projects){
         result.add(new Project(file.getName()));
       }
     }
     return result;
  }


  @RequestMapping(value = "/table/single", method = RequestMethod.POST)
  @Operation(code = Operation.CREATE, desc = Operation.CREATE_DESC)
  public Serializable cteate(@RequestBody Module entity) throws Exception {
    File projectRootDir = getProjectRootDir();

    Map<String, String> data = new HashMap<>();
    data.put("pkg", entity.getPackageName());
    data.put("code", entity.getCode());
    data.put("name", entity.getName());
    data.put("scope", appEnv.getScope());
    data.put("url", entity.getUrl());
    File projectFile = new File(projectRootDir, entity.getProject() + "/src/main/");

    String pkgPath = entity.getPackageName().replace(".", "/");

    for (Tpl t : Tpl.tpls) {
      Template tpl = devopsConfiguration.getTemplate(t.getTpl());
      File file = new File(projectFile, String.format(t.getPath(), pkgPath, entity.getName()));
      file.getParentFile().mkdirs();
      FileWriter out = new FileWriter(file);
      try {
        tpl.process(data, out);
      } finally {
        StreamUtils.close(out);
      }
    }


    System.out.println(projectRootDir);
    return true;
  }

}
