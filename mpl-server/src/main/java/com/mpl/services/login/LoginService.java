package com.mpl.services.login;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mpl.entities.Login;
import com.mpl.payloads.JWTAuthResponse;

@Service
public interface LoginService {

	ResponseEntity<JWTAuthResponse> authenticatePlayer(String username, String password);

	Login createLoginDetails(String email, String password, String phone);

	ResponseEntity<?> refreshToken(HttpServletRequest request);

	void deleteBypEmail(String username);
}
