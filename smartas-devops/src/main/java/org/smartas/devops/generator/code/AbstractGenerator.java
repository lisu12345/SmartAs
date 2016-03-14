package org.smartas.devops.generator.code;

import java.util.List;

import org.smartas.devops.generator.api.CommentGenerator;
import org.smartas.devops.generator.internal.DefaultCommentGenerator;
import org.smartas.devops.generator.meta.IntrospectedTable;

/**
 * 
 * @author Jeff Butler
 * 
 */
public abstract class AbstractGenerator {
  protected CommentGenerator commentGenerator = new DefaultCommentGenerator();
  protected IntrospectedTable introspectedTable;
  protected List<String> warnings;

  public AbstractGenerator() {
    super();
  }


  public IntrospectedTable getIntrospectedTable() {
    return introspectedTable;
  }

  public void setIntrospectedTable(IntrospectedTable introspectedTable) {
    this.introspectedTable = introspectedTable;
  }

  public List<String> getWarnings() {
    return warnings;
  }

  public void setWarnings(List<String> warnings) {
    this.warnings = warnings;
  }
}
