/**
 * 
 */
package com.fiberhome.smartas.registry.ui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseUI;
import com.fiberhome.smartas.registry.Registry;
import com.fiberhome.smartas.registry.service.RegistryService;

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
