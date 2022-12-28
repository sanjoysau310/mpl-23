package com.mpl.services.login;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mpl.config.JWTTokenHelper;
import com.mpl.entities.Login;
import com.mpl.exceptions.ApiException;
import com.mpl.payloads.JWTAuthResponse;
import com.mpl.repositories.LoginRepository;
import com.mpl.services.security.CustomUserDetailsService;
import com.mpl.utils.GeneratePassword;

import io.jsonwebtoken.impl.DefaultClaims;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private LoginRepository loginRepository;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private JWTTokenHelper jwtTokenHelper;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public Login createLoginDetails(String username, String password, String phone) {
		Login login=new Login();
		login.setUsername(username);
		login.setPhone(phone);
		login.setPassword(passwordEncoder.encode(password));
		login.setRole("PLAYER");
		return loginRepository.save(login);
	}

	@Override
	public ResponseEntity<JWTAuthResponse> authenticatePlayer(String username, String password) {
		UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(username,password);
		try {
			authenticationManager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			//System.out.println("Invalid details");
			throw new ApiException("Invalid username or password");
		}
		UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
		String token=jwtTokenHelper.generateToken(userDetails);
		JWTAuthResponse response=new JWTAuthResponse();
		response.setToken(token);
		return new ResponseEntity<JWTAuthResponse>(response, null, HttpStatus.SC_OK);
	}
	
	@Override
	public ResponseEntity<?> refreshToken(HttpServletRequest request) {
		// From the HttpRequest get the claims
		DefaultClaims claims = (DefaultClaims) request.getAttribute("claims");

		Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
		String token = jwtTokenHelper.doGenerateRefreshToken(expectedMap, (UserDetails)expectedMap.get("sub"));
		JWTAuthResponse response=new JWTAuthResponse();
		response.setToken(token);
		return new ResponseEntity<JWTAuthResponse>(response, null, HttpStatus.SC_OK);
	}

	public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
		Map<String, Object> expectedMap = new HashMap<String, Object>();
		for (Entry<String, Object> entry : claims.entrySet()) {
			expectedMap.put(entry.getKey(), (UserDetails) entry.getValue());
		}
		return expectedMap;
	}

	@Override
	public void deleteBypEmail(String username) {
		loginRepository.deleteBypEmail(username);
	}
}
