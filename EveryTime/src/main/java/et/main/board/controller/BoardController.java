package et.main.board.controller;

import java.util.HashMap;
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
	
	// 게시판 메뉴 목록 불러오기
	@RequestMapping(value="/getBoardMenuList.do")
	@ResponseBody
	public List<Map<String, Object>> getBoardMenuList(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {		
		return boardService.getBoardMenuList(param);
	}
	
	// 내가 쓴 글 목록 불러오기
	@RequestMapping(value="/getMyContentList.do")
	@ResponseBody
	public List<Map<String, Object>> getMyContentList(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {		
		return boardService.getMyContentList(param);
	}
	
	// 게시판 목록 불러오기
	@RequestMapping(value="/getBoardContentList.do")
	@ResponseBody
	public List<Map<String, Object>> getBoardContentList(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {		
		return boardService.getBoardContentList(param);
	}
	
	// 게시판 선택된 글 조회 수 증가
	@RequestMapping(value="/hitBoardContent.do")
	@ResponseBody
	public String hitBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {				
		return boardService.hitBoardContent(param);
	}
	
	// 게시판 선택된 글 불러오기
	@RequestMapping(value="/getBoardContent.do")
	@ResponseBody
	public Map<String, Object> getBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {				
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("CONTENT", boardService.getBoardContent(param));
		result.put("COMMENT", boardService.getBoardContComment(param));
		
		return result;
	}
	
	// 게시판 글 작성하기
	@RequestMapping(value="/setBoardContent.do")
	@ResponseBody
	public String setBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {	
		param.put("usrId", session.getAttribute("usrId"));
	
		return boardService.setBoardContent(param);
	}
	
	// 게시판 글 수정하기
	@RequestMapping(value="/modBoardContent.do")
	@ResponseBody
	public String modBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {	
		return boardService.modBoardContent(param);
	}
	
	// 게시판 글 삭제하기
	@RequestMapping(value="/delBoardContent.do")
	@ResponseBody
	public String delBoardContent(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {	
		return boardService.delBoardContent(param);
	}
	
	// 게시판 댓글 작성하기
	@RequestMapping(value="/writeBoardComment.do")
	@ResponseBody
	public void writeBoardComment(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {	
		boardService.writeBoardComment(param);
	}
	
	// 게시판 댓글 삭제하기
	@RequestMapping(value="/delBoardComment.do")
	@ResponseBody
	public void delBoardComment(@RequestParam Map<String, Object> param, HttpSession session) throws Exception {	
		boardService.delBoardComment(param);
	}
}
