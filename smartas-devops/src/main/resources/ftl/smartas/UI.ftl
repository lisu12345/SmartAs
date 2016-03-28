/**
 * 
 */
package ${entity.packageName}.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.resource.BaseResource;
import ${entity.packageName}.${entity.name};
import ${entity.packageName}.service.${entity.name}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.Controller;

/**
 * @author ftl
 *
 */
@Controller()
@Path("${entity.url}")
@Resource(code = ${entity.code}, model = "${scope}", desc = "${entity.name} Resource")
public class ${entity.name}UI extends BaseResource<${entity.name}> {
	@Autowired
	private ${entity.name}Service service;

	protected ${entity.name}Service getService() {
		return service;
	}
	
	////
	@GET
	@Path(value = "/index")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index() {
		return null;
	}
}
