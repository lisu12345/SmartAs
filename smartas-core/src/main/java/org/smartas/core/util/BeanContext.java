/**
 * 
 */
package org.smartas.core.util;

import org.smartas.core.AppEnv;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;

/**
 * @author chenb
 *
 */
public class BeanContext implements BeanFactoryAware {

  private static BeanFactory beanFactory;

  private static AppEnv appEnv;

  public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
    BeanContext.beanFactory = beanFactory;
    appEnv = beanFactory.getBean(AppEnv.class);
  }

  public static <T> T getBean(Class<T> requiredType) throws BeansException {
    return beanFactory.getBean(requiredType);
  }
  
  public static AppEnv getAppEnv() throws BeansException {
    return appEnv;
  }

}
