package et.user.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import et.user.service.UserService;

@Controller
public class UserController {

	@Resource(name="UserService")
	private UserService userService;
	
	@RequestMapping(value="/login.do")
	@ResponseBody
	public String login(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {
		String result = userService.login(param);
		
		if(result == "success") {
			session.setAttribute("usrId", param.get("usrId"));
		}
		
		return result;
	}
	
	@RequestMapping(value="/logout.do")
	@ResponseBody
	public String logout(HttpSession session) throws Exception {
		session.invalidate();
		
		return "success";
	}
	
	@RequestMapping(value="/sessionChk.do")
	@ResponseBody
	public Object sessionChk(HttpSession session) throws Exception {
		return session.getAttribute("usrId");
	}
}
