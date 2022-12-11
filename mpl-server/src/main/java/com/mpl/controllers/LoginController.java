package com.mpl.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mpl.entities.Login;
import com.mpl.payloads.JWTAuthRequest;
import com.mpl.payloads.JWTAuthResponse;
import com.mpl.services.login.LoginService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/addlogin")
	public Login createLoginDetails(@RequestBody Login login) {
		System.out.println("player request-----------------------------------"+login);
		return loginService.createLoginDetails(login.getEmail(),login.getPhone());
	}
	
	@PostMapping("/login")
	public ResponseEntity<JWTAuthResponse> createToken(@RequestBody JWTAuthRequest request) {
		System.out.println("player request-----------------------------------"+request);
		return loginService.authenticatePlayer(request.getUsername(),request.getPassword());
	}

}
