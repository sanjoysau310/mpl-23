package com.mpl.utils;

public class CalculateFees {
	
	public static int getFees(String dob, String kit) {
		int fees=0;
		fees=CalculateAge.getAge(dob)>=21?300:150;
		if(kit.contains("Full Sleeve"))
			fees+=50;
		return fees;
	}

}
