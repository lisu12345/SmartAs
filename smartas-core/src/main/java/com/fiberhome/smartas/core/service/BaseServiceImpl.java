package com.fiberhome.smartas.core.service;

import com.fiberhome.smartas.core.BaseService;
import com.fiberhome.smartas.core.POJO;

public abstract class BaseServiceImpl<T extends POJO> extends GenericServiceImpl<T, Long> implements BaseService<T> {

}
