/**
 * 
 */
package com.fiberhome.smartas.security.ui;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fiberhome.smartas.core.Subject;
import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseUI;
import com.fiberhome.smartas.core.util.SecurityUtils;
import com.fiberhome.smartas.security.Menu;
import com.fiberhome.smartas.security.service.MenuService;

/**
 * @author chenb
 *
 */
@RestController()
@RequestMapping("/security/menu")
@Resource(code = 1001, model = "Smart", desc = "Menu UI")
public class MenuUI extends BaseUI<Menu> {
  @Autowired
  private MenuService service;

  protected MenuService getService() {
    return service;
  }

  @RequestMapping(value = "/navbar", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public List<Menu> navbar(Model model) {
    // 预处理数据，去除父未发布的所有子
    List<Menu> list = service.findNavbarMenus();

    List<Menu> result = new ArrayList<>(50);

    Subject subject = SecurityUtils.getSubject();

    /*
     * list.stream().filter(menu -> { return ; }).iterator(); return list;
     */

    list.forEach(menu -> {
      if (StringUtils.hasText(menu.getModuleCode())) {
        if (subject.isPermitted(menu.getModuleCode() + "." + Operation.READ)) {
          result.add(menu);
        }
      } else {
        result.add(menu);
      }
    });
    return result;
  }

}
