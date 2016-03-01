/**
 * 
 */
package org.smartas.registry.ui;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.registry.Registry;
import org.smartas.registry.service.RegistryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author ftl
 *
 */
@RestController()
@RequestMapping("/registry")
@Resource(code = 1201, model = "Smart", desc = "Registry UI")
public class RegistryUI extends BaseUI<Registry> {
	@Autowired
	private RegistryService service;

	protected RegistryService getService() {
		return service;
	}
	
	////
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index(Model model) {
		return null;
	}
}
