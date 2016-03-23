/**
 * 
 */
package com.fiberhome.smartas.demo.workflow.ui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseFlowUI;
import com.fiberhome.smartas.demo.workflow.DemoWorkflow;
import com.fiberhome.smartas.demo.workflow.service.DemoWorkflowService;

/**
 * @author ftl
 *
 */
@RestController()
@RequestMapping("/demo/workflow")
@Resource(code = 4001, model = "Smart", desc = "DemoWorkflow UI")
public class DemoWorkflowUI extends BaseFlowUI<DemoWorkflow> {
	@Autowired
	private DemoWorkflowService service;

	protected DemoWorkflowService getService() {
		return service;
	}

	////
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index(Model model) {
		return null;
	}
}
