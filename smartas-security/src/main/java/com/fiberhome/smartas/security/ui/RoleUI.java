/**
 * 
 */
package com.fiberhome.smartas.security.ui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseUI;
import com.fiberhome.smartas.security.Role;
import com.fiberhome.smartas.security.service.RoleService;

/**
 * @author chenb
 *
 */
@RestController()
@RequestMapping("/security/role")
@Resource(code = 1002, model = "Smart", desc = "Role UI")
public class RoleUI extends BaseUI<Role> {
	@Autowired
	private RoleService service;

	protected RoleService getService() {
		return service;
	}

	/*@RequestMapping(value = "/navbar", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public List<Menu> navbar(Model model) {
		// 预处理数据，去除父未发布的所有子
		List<Menu> list = service.findNavbarMenus();

		return list;
	}*/

}
