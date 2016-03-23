/**
 * 
 */
package com.fiberhome.smartas.security.ui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseUI;
import com.fiberhome.smartas.security.User;
import com.fiberhome.smartas.security.service.UserService;

/**
 * @author chenb
 *
 */
@RestController()
@RequestMapping("/security/user")
@Resource(code = 1000, model = "Smart", desc = "User UI")
public class UserUI extends BaseUI<User> {

	@Autowired
	private UserService userService;

	protected UserService getService() {
		return userService;
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index(Model model) {
		return null;
	}

}
