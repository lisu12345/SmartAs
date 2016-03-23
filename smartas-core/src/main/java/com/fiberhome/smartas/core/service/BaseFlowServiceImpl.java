package com.fiberhome.smartas.core.service;

import java.io.Serializable;

import com.fiberhome.smartas.core.BaseFlowService;
import com.fiberhome.smartas.core.FlowAware;

/**
 * @author chenb
 *
 * @param <T>
 */
public abstract class BaseFlowServiceImpl<T extends FlowAware> extends BaseServiceImpl<T> implements BaseFlowService<T> {

	public Serializable start(T vo) {
		return start(vo);
	}

	public void approve(T vo) {
		update(vo);
	}
}
