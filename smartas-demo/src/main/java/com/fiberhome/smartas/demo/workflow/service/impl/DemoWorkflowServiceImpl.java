package com.fiberhome.smartas.demo.workflow.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.smartas.core.service.BaseFlowServiceImpl;
import com.fiberhome.smartas.demo.workflow.DemoWorkflow;
import com.fiberhome.smartas.demo.workflow.dao.DemoWorkflowDao;
import com.fiberhome.smartas.demo.workflow.service.DemoWorkflowService;

/**
 * @author ftl
 *
 */
@Service
public class DemoWorkflowServiceImpl extends BaseFlowServiceImpl<DemoWorkflow> implements DemoWorkflowService {

	@Autowired
	private DemoWorkflowDao dao;

	protected DemoWorkflowDao getDao() {
		return dao;
	}

	////

}
