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
	
	public List<Map<String, Object>> getBoardList(Map<String, Object> param) throws Exception {
		return sqlSession.selectList("board.getBoardList", param);
	}
	
	public String hitBoardContent(Map<String, Object> param) throws Exception {
		sqlSession.update("board.hitBoardContent", param);
		
		return "success";
	}
	
	public List<Map<String, Object>> getBoardContent(Map<String, Object> param) throws Exception {
		return sqlSession.selectList("board.getBoardContent", param);
	}
	
	public String setBoardContent(Map<String, Object> param) throws Exception {
		sqlSession.update("board.alterBrdAutoIncrement", param);
		sqlSession.insert("board.setBoardContent", param);
		
		return "success";
	}
	
	public String modBoardContent(Map<String, Object> param) throws Exception {	
		sqlSession.update("board.modBoardContent", param);
		
		return "success";
	}
	
	public String delBoardContent(Map<String, Object> param) throws Exception {
		sqlSession.delete("board.delBoardContent", param);
		sqlSession.update("board.alterBrdAutoIncrement", param);
		
		return "success";
	}
}
