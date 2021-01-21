package et.user.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("UserService")
public class UserService {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public String login(Map<String, Object> param) throws Exception {
		int result = 0;
		result = sqlSession.selectOne("user.login", param);
		
		if(result == 1) {
			return "success";
		} else {
			return "failed";
		}
	}
}
