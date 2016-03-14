package org.smartas.devops.generator.api.dom.xml;

import org.smartas.devops.generator.util.OutputUtilities;

/**
 * The Class TextElement.
 *
 * @author Jeff Butler
 */
public class TextElement extends Element {

  /** The content. */
  private String content;

  /**
   * Instantiates a new text element.
   *
   * @param content the content
   */
  public TextElement(String content) {
    super();
    this.content = content;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.xml.Element#getFormattedContent(int)
   */
  @Override
  public String getFormattedContent(int indentLevel) {
    StringBuilder sb = new StringBuilder();
    OutputUtilities.xmlIndent(sb, indentLevel);
    sb.append(content);
    return sb.toString();
  }

  /**
   * Gets the content.
   *
   * @return the content
   */
  public String getContent() {
    return content;
  }
}
