package com.example.SpringCloudServiceRegistrationEurekaServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SpringCloudServiceRegistrationEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringCloudServiceRegistrationEurekaServerApplication.class, args);
	}

}
