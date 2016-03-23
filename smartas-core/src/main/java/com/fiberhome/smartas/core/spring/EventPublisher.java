/**
 * 
 */
package com.fiberhome.smartas.core.spring;

import com.fiberhome.smartas.core.spring.event.AppEvent;

/**
 * @author chenb
 *
 */
public interface EventPublisher {

	void publish(AppEvent event);
}
