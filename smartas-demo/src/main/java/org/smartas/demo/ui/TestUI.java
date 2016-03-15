/**
 * 
 */
package org.smartas.demo.ui;

import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.demo.Test;
import org.smartas.demo.service.TestService;
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
@RequestMapping("/demo/test")
@Resource(code = 7000, model = "Smart", desc = "Test UI")
public class TestUI extends BaseUI<Test> {
	@Autowired
	private TestService service;

	protected TestService getService() {
		return service;
	}
	
	////
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index(Model model) {
		return null;
	}
}
