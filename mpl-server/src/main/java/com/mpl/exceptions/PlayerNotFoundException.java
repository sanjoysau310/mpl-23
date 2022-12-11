package com.mpl.exceptions;

@SuppressWarnings("serial")
public class PlayerNotFoundException extends RuntimeException{

	public PlayerNotFoundException(int id) {
		super("Player not found with id "+id);
	}
	
	public PlayerNotFoundException(String email) {
		super("Player not found with email "+email);
	}
}
