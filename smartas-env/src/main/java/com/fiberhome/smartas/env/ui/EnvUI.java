/**
 * 
 */
package com.fiberhome.smartas.env.ui;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.support.WebApplicationObjectSupport;

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
@Controller()
@RequestMapping("/env")
public class EnvUI extends WebApplicationObjectSupport {

	@Autowired
	private EventPublisher eventPublisher;

	/**
	 * 包括用户及环境信息
	 * 
	 * @return
	 */
	@RequestMapping(value = "workspace", method = RequestMethod.GET)
	public String workspace(Model model, HttpSession session) {
		String[] profiles = getApplicationContext().getEnvironment().getDefaultProfiles();
		model.addAttribute("profile", StringUtils.join(profiles, ","));
		model.addAttribute("user",SecurityUtils.getSubject().getPrincipal());
		return "smartas/info";
	}

	@RequestMapping(value = "dev/mybatis", method = RequestMethod.GET)
	@ResponseBody
	public String mybatis(Model model) {
		MyBaitsRefreshEvent event = new MyBaitsRefreshEvent();
		eventPublisher.publish(event);
		return event.isSucess() ? "sucess" : "fail";
	}

}
