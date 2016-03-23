/**
 * 
 */
package ${entity.packageName}.ui;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseUI;
import ${entity.packageName}.${entity.name};
import ${entity.packageName}.service.${entity.name}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author ftl
 *
 */
@RestController()
@RequestMapping("${entity.url}")
@Resource(code = ${entity.code}, model = "${scope}", desc = "${entity.name} UI")
public class ${entity.name}UI extends BaseUI<${entity.name}> {
	@Autowired
	private ${entity.name}Service service;

	protected ${entity.name}Service getService() {
		return service;
	}
	
	////
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index(Model model) {
		return null;
	}
}
