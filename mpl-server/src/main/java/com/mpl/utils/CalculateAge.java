package com.mpl.utils;

import java.time.LocalDate;
import java.time.Period;

public class CalculateAge {
	
	public static double getAge(String dob) {
		double years=0;
		if ((dob != null)) {  
		    Period period = Period.between(LocalDate.parse(dob), LocalDate.now());
			years=period.getYears()+Math.round(((double)period.getMonths()/12)*100.0)/100.0;
		}
		return years;
	}
}
