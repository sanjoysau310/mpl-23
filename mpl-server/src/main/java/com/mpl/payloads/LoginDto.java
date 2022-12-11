package com.mpl.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class LoginDto {
	
	private String email;
	private String phone;
	private String password;
	private String role;
}
