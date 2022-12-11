package com.mpl.services.payment;

import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.mpl.entities.Payment;


@Service
public interface PaymentService {
	//TreeMap<String, String> getPaytmDetails(PlayerBean paymentDetails) throws Exception;
	TreeMap<String, String> getPaytmDetails(Integer id) throws Exception;
	Payment getPaymentResponse(HttpServletRequest request);
	boolean validateCheckSum(TreeMap<String, String> parameters, String paytmChecksum) throws Exception;
	String getCheckSum(TreeMap<String, String> parameters) throws Exception;
}
