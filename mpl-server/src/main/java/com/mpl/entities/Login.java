package com.mpl.entities;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SuppressWarnings("serial")
@Component
@Document(collection = "mpl_2023_login")
@Data
@JsonIgnoreProperties
@NoArgsConstructor
@Getter
@Setter
public class Login implements UserDetails{
	@Id
	@Indexed(unique = true)
	private String username;
	@Indexed(unique = true)
	private String phone;
	private String password;
	private String role;

	@Override
	public String toString() {
		return "LoginBean [username=" + username + ", phone=" + phone + ", password=" + password + ", role=" + role + "]";
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<SimpleGrantedAuthority>(Arrays.asList(new SimpleGrantedAuthority("ROLE_"+role)));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}
