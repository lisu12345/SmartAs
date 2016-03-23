package org.smartas.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.TYPE })
public @interface FileProcess {

	/**
	 * The key of the process definition to start, as provided in the 'id'
	 * attribute of a bpmn20.xml process definition.
	 * 
	 *  获取文件下载列表时，对物理存储位置的文件进行校验
	 */
	String value() default "";

}
