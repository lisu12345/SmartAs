package com.fiberhome.smartas.devops.generator.api.dom.xml;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.fiberhome.smartas.devops.generator.util.OutputUtilities;

/**
 * The Class XmlElement.
 *
 * @author Jeff Butler
 */
public class XmlElement extends Element {

  /** The attributes. */
  private List<Attribute> attributes;

  /** The elements. */
  private List<Element> elements;

  /** The name. */
  private String name;

  /**
   * Instantiates a new xml element.
   *
   * @param name the name
   */
  public XmlElement(String name) {
    super();
    attributes = new ArrayList<Attribute>();
    elements = new ArrayList<Element>();
    this.name = name;
  }

  /**
   * Copy constructor. Not a truly deep copy, but close enough for most purposes.
   *
   * @param original the original
   */
  public XmlElement(XmlElement original) {
    super();
    attributes = new ArrayList<Attribute>();
    attributes.addAll(original.attributes);
    elements = new ArrayList<Element>();
    elements.addAll(original.elements);
    this.name = original.name;
  }

  /**
   * Gets the attributes.
   *
   * @return Returns the attributes.
   */
  public List<Attribute> getAttributes() {
    return attributes;
  }

  /**
   * Adds the attribute.
   *
   * @param attribute the attribute
   */
  public void addAttribute(Attribute attribute) {
    attributes.add(attribute);
  }

  /**
   * Gets the elements.
   *
   * @return Returns the elements.
   */
  public List<Element> getElements() {
    return elements;
  }

  /**
   * Adds the element.
   *
   * @param element the element
   */
  public void addElement(Element element) {
    elements.add(element);
  }

  /**
   * Adds the element.
   *
   * @param index the index
   * @param element the element
   */
  public void addElement(int index, Element element) {
    elements.add(index, element);
  }

  /**
   * Gets the name.
   *
   * @return Returns the name.
   */
  public String getName() {
    return name;
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
    sb.append('<');
    sb.append(name);

    Collections.sort(attributes);
    for (Attribute att : attributes) {
      sb.append(' ');
      sb.append(att.getFormattedContent());
    }

    if (elements.size() > 0) {
      sb.append(">"); //$NON-NLS-1$
      for (Element element : elements) {
        OutputUtilities.newLine(sb);
        sb.append(element.getFormattedContent(indentLevel + 1));
      }
      OutputUtilities.newLine(sb);
      OutputUtilities.xmlIndent(sb, indentLevel);
      sb.append("</"); //$NON-NLS-1$
      sb.append(name);
      sb.append('>');

    } else {
      sb.append(" />"); //$NON-NLS-1$
    }

    return sb.toString();
  }

  /**
   * Sets the name.
   *
   * @param name the new name
   */
  public void setName(String name) {
    this.name = name;
  }
}