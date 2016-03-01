/**
 * 
 */
package org.smartas.core.util;

/**
 * @author chenb
 *
 */
public class DaoUtils {

	public static int realPage(int page, int pageSize, int length) {
		if ((page - 1) * pageSize > length) {
			page = (length + pageSize - 1) / pageSize;
		}
		return page;
	}
}
