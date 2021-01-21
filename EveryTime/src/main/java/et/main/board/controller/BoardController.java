package et.main.board.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import et.main.board.service.BoardService;

@Controller
public class BoardController {

	@Resource(name="BoardService")
	private BoardService boardService;
	
	@RequestMapping(value="/getBoardList.do")
	@ResponseBody
	public List<Map<String, Object>> getBoardList(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {		
		return boardService.getBoardList(param);
	}
	
	@RequestMapping(value="/hitBoardContent.do")
	@ResponseBody
	public String hitBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {				
		return boardService.hitBoardContent(param);
	}
	
	@RequestMapping(value="/getBoardContent.do")
	@ResponseBody
	public List<Map<String, Object>> getBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {				
		return boardService.getBoardContent(param);
	}
	
	@RequestMapping(value="/setBoardContent.do")
	@ResponseBody
	public String setBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {	
		param.put("usrId", session.getAttribute("usrId"));
	
		return boardService.setBoardContent(param);
	}
	
	@RequestMapping(value="/modBoardContent.do")
	@ResponseBody
	public String modBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {	
		return boardService.modBoardContent(param);
	}
	
	@RequestMapping(value="/delBoardContent.do")
	@ResponseBody
	public String delBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {	
		return boardService.delBoardContent(param);
	}
	
}
