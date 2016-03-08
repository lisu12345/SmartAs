/**
 * 
 */
package org.smartas.devops.generator;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;

import freemarker.template.Configuration;
import freemarker.template.Template;

/**
 * @author chenb
 *
 */
public class Boot {

  private static final Configuration cfg = new Configuration(Configuration.VERSION_2_3_23);

  private static final File ROOT = new File("..");
  private static final File PRO_ROOT = new File(".");
  // private static final String PREFIX = "smart";
  private static final String CONFIG_FILE = "package.json";

  private static List<Project> projects;

  public static void main(String[] args) throws Exception {
    Scanner scanner = new Scanner(System.in);
    try {
      cfg.setDirectoryForTemplateLoading(new File(PRO_ROOT, "src/main/resources/ftl"));

      ByteArrayOutputStream baos = new ByteArrayOutputStream();

      InputStream in = Boot.class.getClassLoader().getResourceAsStream(CONFIG_FILE);

      StreamUtils.copy(in, baos);

      byte[] bytes = baos.toByteArray();

      projects = JSON.parseObject(bytes, new TypeReference<List<Project>>() {}.getType());
      System.out
          .println("------------------------------------------------------------------------");
      System.out.println("Project List:");
      int i = 1;
      for (Project p : projects) {
        System.out.println(i + "." + p.getName());
        i++;
      }
      System.out
          .println("------------------------------------------------------------------------");

      System.out.print("选择一个项目编号(1-" + projects.size() + "):");
      Project project = projects.get(scanner.nextInt() - 1);
      System.out.println("\n");
      System.out
          .println("------------------------------------------------------------------------");
      System.out.println("Package List:");
      i = 1;
      for (String pkg : project.getPackages()) {
        System.out.println(i + "." + pkg);
        i++;
      }
      System.out
          .println("------------------------------------------------------------------------");

      System.out.print("选择一个package编号:");
      int pkg = scanner.nextInt();

      System.out.println("\n");
      scanner.nextLine();
      System.out.print("输入一个VO对象名称:");
      String name = scanner.nextLine();
      while (StringUtils.isEmpty(name) || !Character.isUpperCase(name.charAt(0))) {
        System.out.print("输入一个VO对象名称:");
        name = scanner.nextLine();
      }
      String pkgName = project.getPackages()[pkg - 1];
      Map<String, String> data = new HashMap<>();
      data.put("pkg", pkgName);
      data.put("name", name);
      File projectFile = new File(ROOT, project.getName() + "/src/main/");

      String pkgPath = pkgName.replace(".", "/");
      String modelName = name;

      for (Tpl t : Tpl.tpls) {
        Template tpl = cfg.getTemplate(t.getTpl());
        File file = new File(projectFile, String.format(t.getPath(), pkgPath, modelName));
        file.getParentFile().mkdirs();
        FileWriter out = new FileWriter(file);
        tpl.process(data, out);
      }

    } finally {
      scanner.close();
    }

  }
}
