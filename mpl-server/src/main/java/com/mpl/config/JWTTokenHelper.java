package com.mpl.config;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.mpl.entities.Login;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTTokenHelper implements Serializable {

	private static final long serialVersionUID = 5858658232798274502L;

	private static final long JWT_TOKEN_VALIDITY = 1*60*60;

	private static final long JWT_REFRESH_TOKEN_VALIDITY = 2*60*60;

	@Value("${jwt.secret}")
	private String secret;

	public String getPlayerEmailFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public <T> T getClaimFromToken(String token, Function<Claims, T> claimResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimResolver.apply(claims);
	}

	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	// generate token for user
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		// System.out.println("user-------------------"+userDetails.getAuthorities().toString());
		return doGenerateToken(claims, userDetails);
	}

	// creating Token
	private String doGenerateToken(Map<String, Object> claims, UserDetails userDetails) {
		return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
				.claim("role", userDetails.getAuthorities().toArray()[0].toString())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
	}

	// refesh token
	public String doGenerateRefreshToken(Map<String, Object> claims, UserDetails userDetails) {
		return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
				.claim("role", userDetails.getAuthorities().toArray()[0].toString())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_REFRESH_TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS256, secret).compact();

	}

	// validate token
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String email = getPlayerEmailFromToken(token);
		return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
