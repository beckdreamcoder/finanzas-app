package com.utp.finanzasApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.utp.finanzasApp.sales.infrastructure.entities")
public class FinanzasAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinanzasAppApplication.class, args);
	}
}

