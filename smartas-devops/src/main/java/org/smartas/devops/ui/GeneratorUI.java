/**
 * 
 */
package org.smartas.devops.ui;

import org.smartas.core.Pageable;
import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.devops.Table;
import org.smartas.devops.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author ftl
 *
 */
@RestController()
@RequestMapping("/devops/generator")
@Resource(code = 1901, model = "Smart", desc = "Generator UI")
public class GeneratorUI {
	@Autowired
	private DatabaseService service;

	protected DatabaseService getService() {
		return service;
	}

	@RequestMapping(value = "/table/list/{page}/{pageSize}", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public Pageable<Table> getAll(@PathVariable("page") int page, @PathVariable("pageSize") int pageSize) {
		return service.getAll(page, pageSize);
	}

}
