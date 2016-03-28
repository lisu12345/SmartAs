package com.fiberhome.smartas.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotate a class that can be serialized/deserialized if FastJsonProvider is configured with
 * Annotation scan.
 * 
 * @author chenb
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface FastJsonType {

}
