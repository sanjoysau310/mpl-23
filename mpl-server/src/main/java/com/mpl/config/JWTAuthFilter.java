package com.mpl.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mpl.services.security.CustomUserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;


@Component
public class JWTAuthFilter extends OncePerRequestFilter{
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private JWTTokenHelper jwtTokenHelper;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
//		String requestToken=request.getHeader("Authorization");
//		String playerName=null,token=null;
//		if(request!=null && requestToken.startsWith("Bearer")) {
//			token=requestToken.substring(7);
//			try {
//				playerName=jwtTokenHelper.getPlayerNameFromToken(token);
//			} catch (IllegalArgumentException e) {
//				System.out.println("Unable to get token");
//			} catch (ExpiredJwtException e) {
//				System.out.println("Expired token");
//			} catch (MalformedJwtException e) {
//				System.out.println("Invalid JWT token");
//			}
//		} else {
//			System.out.println("Request token does not starts with Bearer");
//		}
//		if(playerName!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
//			//re check casting
//			UserDetails userDetails=userDetailsService.loadUserByUsername(playerName);
//			if(jwtTokenHelper.validateToken(token, userDetails)) {
//				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//			} else {
//				System.out.println("Invalid JWT token");
//			}
//		} else {
//			System.out.println("Username null");
//		}
//		filterChain.doFilter(request, response);			
		
final String requestTokenHeader=request.getHeader("Authorization");
		
		String username=null;
		String jwtToken=null;
		try {
			if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
				jwtToken = requestTokenHeader.substring(7);
				
				username = jwtTokenHelper.getPlayerNameFromToken(jwtToken);
			}
			
			if(requestTokenHeader!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				
				UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
				if(jwtTokenHelper.validateToken(jwtToken, userDetails)) {
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken= new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
					usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
			
			filterChain.doFilter(request, response);
		}catch(Exception e) {
			response.sendError(HttpStatus.SC_INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
}
