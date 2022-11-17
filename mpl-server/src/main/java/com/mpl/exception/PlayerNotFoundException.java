package com.mpl.exception;

@SuppressWarnings("serial")
public class PlayerNotFoundException extends RuntimeException{

	public PlayerNotFoundException(int id) {
		super("Player not found with id "+id);
	}
}
