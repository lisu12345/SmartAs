package com.fiberhome.smartas.core.ui;

import java.io.Serializable;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fiberhome.smartas.core.BaseFlowService;
import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.FlowAware;
import com.fiberhome.smartas.core.annotation.Operation;

/**
 * @author chenb
 * {@link BaseFlowResource}
 * @param <T>
 */
@Deprecated
public abstract class BaseFlowUI<T extends FlowAware> extends BaseUI<T> {

	protected abstract BaseFlowService<T> getService();

	@RequestMapping(value = "/process", method = RequestMethod.POST)
	@Operation(code = Operation.CREATE_PROCESS, desc = Operation.CREATE_PROCESS_DESC)
	public Serializable start(@RequestBody T o) {
		return getService().start(o);
	}

	@RequestMapping(value = "/process", method = RequestMethod.PUT)
	@Operation(code = Operation.APPROVE_PROCESS, desc = Operation.APPROVE_PROCESS_DESC)
	public void approve(@RequestBody T o) throws BusinessAccessException {
		getService().approve(o);
	}

}
