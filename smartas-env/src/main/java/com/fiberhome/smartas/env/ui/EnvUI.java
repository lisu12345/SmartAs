/**
 * 
 */
package com.fiberhome.smartas.env.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import com.fiberhome.smartas.core.BaseExceptionAwareResource;
import com.fiberhome.smartas.core.spring.EventPublisher;
import com.fiberhome.smartas.core.spring.event.MyBaitsRefreshEvent;
import com.fiberhome.smartas.core.util.SecurityUtils;

/**
 * @author chenb 需要动态构建的首页环境变量
 * 
 *         用ftl渲染
 * 
 *         ftl/info.ftl
 */
@Controller
@Path("env")
public class EnvUI extends BaseExceptionAwareResource {

  @Autowired
  private EventPublisher eventPublisher;

  /**
   * 包括用户及环境信息
   * 
   * @return
   */
  @GET
  @Path(value = "workspace")
  public ModelAndView workspace() {
    ModelAndView modelAndView = new ModelAndView("smartas/info");
    String[] profiles = getApplicationContext().getEnvironment().getDefaultProfiles();
    modelAndView.addObject("profile", StringUtils.join(profiles, ","));
    modelAndView.addObject("user", SecurityUtils.getSubject().getPrincipal());
    return modelAndView;
  }

  @GET
  @Path(value = "dev/mybatis")
  public String mybatis() {
    MyBaitsRefreshEvent event = new MyBaitsRefreshEvent();
    eventPublisher.publish(event);
    return event.isSucess() ? "sucess" : "fail";
  }

}
