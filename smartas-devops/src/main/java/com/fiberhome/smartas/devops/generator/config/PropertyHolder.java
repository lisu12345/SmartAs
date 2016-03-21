package com.fiberhome.smartas.devops.generator.config;

import java.util.Enumeration;
import java.util.Properties;

import com.fiberhome.smartas.devops.generator.api.dom.xml.Attribute;
import com.fiberhome.smartas.devops.generator.api.dom.xml.XmlElement;

/**
 * @author Jeff Butler
 */
public abstract class PropertyHolder {
    private Properties properties;

    /**
	 *  
	 */
    public PropertyHolder() {
        super();
        properties = new Properties();
    }

    public void addProperty(String name, String value) {
        properties.setProperty(name, value);
    }

    public String getProperty(String name) {
        return properties.getProperty(name);
    }

    public Properties getProperties() {
        return properties;
    }

    protected void addPropertyXmlElements(XmlElement xmlElement) {
        Enumeration<?> enumeration = properties.propertyNames();
        while (enumeration.hasMoreElements()) {
            String propertyName = (String) enumeration.nextElement();

            XmlElement propertyElement = new XmlElement("property"); //$NON-NLS-1$
            propertyElement.addAttribute(new Attribute("name", propertyName)); //$NON-NLS-1$
            propertyElement.addAttribute(new Attribute(
                    "value", properties.getProperty(propertyName))); //$NON-NLS-1$
            xmlElement.addElement(propertyElement);
        }
    }
}
