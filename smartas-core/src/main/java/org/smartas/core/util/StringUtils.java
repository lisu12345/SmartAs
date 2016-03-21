/**
 * 
 */
package org.smartas.core.util;

/**
 * @author chenb
 *
 */
public class StringUtils {

  public static String convertPropertyNameToUnderscoreName(String name) {
    return name.replaceAll("[A-Z]", "\\_$0");
  }

  /*
   * public static void main(String[] args) {
   * System.out.println(convertPropertyNameToUnderscoreName("convertPropertyNameToUnderscoreName"));
   * }
   */
}
