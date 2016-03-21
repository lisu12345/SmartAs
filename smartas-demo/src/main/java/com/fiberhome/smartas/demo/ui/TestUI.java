/**
 * 
 */
package com.fiberhome.smartas.demo.ui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseUI;
import com.fiberhome.smartas.demo.Test;
import com.fiberhome.smartas.demo.service.TestService;

/**
 * @author ftl
 *
 */
@RestController()
@RequestMapping("/demo/test")
@Resource(code = 9000, model = "Smart", desc = "Test UI")
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
