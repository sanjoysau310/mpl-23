package com.mpl.services.login;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mpl.entities.Login;
import com.mpl.payloads.JWTAuthResponse;

@Service
public interface LoginService {

	ResponseEntity<JWTAuthResponse> authenticatePlayer(String username, String password);

	Login createLoginDetails(String email, String phone);
}
