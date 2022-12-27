package com.mpl.controllers;

import javax.servlet.http.HttpServletRequest;

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
		return loginService.createLoginDetails(login.getUsername(), login.getPassword(), login.getPhone());
	}
	
	@PostMapping("/login")
	public ResponseEntity<JWTAuthResponse> createToken(@RequestBody JWTAuthRequest request) {
		return loginService.authenticatePlayer(request.getUsername(),request.getPassword());
	}
	
	@PostMapping("/refreshToken")
	public ResponseEntity<?> refreshToken(@RequestBody HttpServletRequest request) {
		//return loginService.authenticatePlayer(request.getUsername(),request.getPassword());
		return loginService.refreshToken(request);
	}
	
	@PostMapping("/logout")
	public String removeToken(@RequestBody String token) {
		//return loginService.authenticatePlayer(request.getUsername(),request.getPassword());
		return null;
	}

}
