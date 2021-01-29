package et.main.board.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("BoardService")
public class BoardService {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 게시판 메뉴 목록 불러오기
	public List<Map<String, Object>> getBoardMenuList(Map<String, Object> param) throws Exception {
		return sqlSession.selectList("board.getBoardMenuList", param);
	}
	
	// 내가 쓴 글 목록 불러오기
	public List<Map<String, Object>> getMyContentList(Map<String, Object> param) throws Exception {
		return sqlSession.selectList("board.getMyContentList", param);
	}
	
	// 게시판 목록 불러오기
	public List<Map<String, Object>> getBoardContentList(Map<String, Object> param) throws Exception {
		return sqlSession.selectList("board.getBoardContentList", param);
	}
	
	// 게시판 선택된 글 조회 수 증가
	public String hitBoardContent(Map<String, Object> param) throws Exception {
		sqlSession.update("board.hitBoardContent", param);
		
		return "success";
	}
	
	// 게시판 선택된 글 불러오기
	public List<Map<String, Object>> getBoardContent(Map<String, Object> param) throws Exception {
		return sqlSession.selectList("board.getBoardContent", param);
	}
	
	// 게시판 선택된 글의 댓글 불러오기
	public List<Map<String, Object>> getBoardContComment(Map<String, Object> param) throws Exception {
		return sqlSession.selectList("board.getBoardContComment", param);
	}
	
	// 게시판 글 작성하기
	public String setBoardContent(Map<String, Object> param) throws Exception {
		sqlSession.insert("board.setBoardContent", param);
		
		return "success";
	}
	
	// 게시판 글 수정하기
	public String modBoardContent(Map<String, Object> param) throws Exception {	
		sqlSession.update("board.modBoardContent", param);
		
		return "success";
	}
	
	// 게시판 글 삭제하기
	public String delBoardContent(Map<String, Object> param) throws Exception {
		sqlSession.update("board.delBoardContent", param);
		
		return "success";
	}
	
	// 게시판 댓글 작성하기
	public void writeBoardComment(Map<String, Object> param) throws Exception {
		sqlSession.insert("board.writeBoardComment", param);
	}
	
	// 게시판 댓글 삭제하기
	public void delBoardComment(Map<String, Object> param) throws Exception {
		sqlSession.update("board.delBoardComment", param);
	}
}
