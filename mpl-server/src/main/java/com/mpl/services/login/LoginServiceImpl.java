package com.mpl.services.login;

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
	public Login createLoginDetails(String email, String phone) {
		Login login=new Login();
		login.setEmail(email);
		login.setPhone(phone);
		//login.setPassword(passwordEncoder.encode(GeneratePassword.generatePassword()));
		login.setPassword(passwordEncoder.encode("test123"));
		login.setRole("PLAYER");
		return loginRepository.save(login);
	}

	@Override
	public ResponseEntity<JWTAuthResponse> authenticatePlayer(String username, String password) {
		UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(username,password);
		try {
			authenticationManager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			System.out.println("Invalid details");
			throw new ApiException("Invalid username or password");
		}
		
		/// check casting
		UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
		//System.out.println("Authrnicate-----------"+userDetails);
		
		String token=jwtTokenHelper.generateToken(userDetails);
		
		System.out.println("Authrnicate token-----------"+token);
		
		JWTAuthResponse response=new JWTAuthResponse();
		response.setToken(token);
		
		return new ResponseEntity<JWTAuthResponse>(response, null, HttpStatus.SC_OK);
	}
}
