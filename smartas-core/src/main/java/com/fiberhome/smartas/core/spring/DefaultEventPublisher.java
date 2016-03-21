/**
 * 
 */
package com.fiberhome.smartas.core.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import com.fiberhome.smartas.core.spring.event.AppEvent;

/**
 * @author chenb
 *
 */
public class DefaultEventPublisher implements EventPublisher {

	@Autowired
	private ApplicationContext applicationContext;

	public void publish(AppEvent event) {
		applicationContext.publishEvent(event);
	}
}
