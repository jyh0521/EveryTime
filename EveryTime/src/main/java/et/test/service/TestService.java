package et.test.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("testService")
public class TestService {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<Map<String, Object>> testQry(Map<String, Object> map) throws Exception {
		return sqlSession.selectList("sample.test", map);
	}
}
