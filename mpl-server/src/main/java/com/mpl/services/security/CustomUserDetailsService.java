package com.mpl.services.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mpl.entities.Login;
import com.mpl.exceptions.PlayerNotFoundException;
import com.mpl.repositories.LoginRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private LoginRepository loginRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Login loginDetails=loginRepository.findByUsername(username).orElseThrow(()->new PlayerNotFoundException(username));
		return loginDetails;
	}

}
