package et.test.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import et.test.service.TestService;

@Controller
public class TestController {

	@Resource(name="testService")
	private TestService testService;
	
//	public ModelAndView test(Map<String, Object> commandMap) throws Exception {
//		ModelAndView mv = new ModelAndView("/login");
//		
//		List<Map<String, Object>> list = testService.testQry(commandMap);
//		mv.addObject("list", list);
//		
//		return mv;
//	}
	@RequestMapping(value="/test.do")
	@ResponseBody
	public List<Map<String, Object>> test(Map<String, Object> commandMap) throws Exception {
		List<Map<String, Object>> list = testService.testQry(commandMap);
		
		return list;
	}
}
