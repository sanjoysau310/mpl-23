package com.mpl.config;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.mpl.entities.Login;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTTokenHelper {
	
	private static final long JWT_TOKEN_VALIDITY=5*60*60;
	private String secret="jwtTokenKey";
	
	public String getPlayerNameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}
	
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}
	
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimResolver) {
		final Claims claims=getAllClaimsFromToken(token);
		return claimResolver.apply(claims);
	}

	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}
	private Boolean isTokenExpired(String token) {
		final Date expiration=getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
	
	//generate token for user
		public String generateToken(UserDetails userDetails) {
			Map<String,Object> claims=new HashMap<>();
			return doGenerateToken(claims, userDetails.getUsername());
		}
		
		//creating Token
		private String doGenerateToken(Map<String,Object> claims,String email) {
			return Jwts.builder().setClaims(claims).setSubject(email)
					.setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY*1000))
					.signWith(SignatureAlgorithm.HS512, secret).compact();
		}
	
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String email=getPlayerNameFromToken(token);
		return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
