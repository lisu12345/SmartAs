package com.fiberhome.smartas.devops.generator.api.dom.xml;

/**
 * @author Jeff Butler
 */
public abstract class Element {

    /**
     * 
     */
    public Element() {
        super();
    }

    public abstract String getFormattedContent(int indentLevel);
}
