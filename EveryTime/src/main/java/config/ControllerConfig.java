package config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import controller.TestController;
import service.TestService;



@Configuration
public class ControllerConfig {
	
	@Bean
	public TestController testController() {
		TestController testController = new TestController();
		return testController;
	}
	
}
