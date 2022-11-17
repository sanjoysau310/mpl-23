package com.mpl.controller;

import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mpl.bean.PaytmBean;
import com.paytm.pg.merchant.PaytmChecksum;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class PaymentController {

	@Autowired
	private PaytmBean paytmBean;
	@Autowired
	private Environment env;

	@PostMapping(value = "/makepayment")
	public ModelAndView getRedirect(@RequestParam(name = "CUST_ID") String customerId,
			@RequestParam(name = "TXN_AMOUNT") String transactionAmount,
			@RequestParam(name = "ORDER_ID") String orderId) throws Exception {

		System.out.println("CUST_ID::::::---------------------" + customerId);
		System.out.println("tx_id::::::---------------------" + transactionAmount);
		System.out.println("order_ID::::::---------------------" + orderId);
		System.out.println("pay url::::::---------------------" + paytmBean.getPaytmUrl());
		
		ModelAndView modelAndView = new ModelAndView("redirect:" + paytmBean.getPaytmUrl());
		TreeMap<String, String> parameters = new TreeMap<>();
		paytmBean.getDetails().forEach((k, v) -> parameters.put(k, v));
		parameters.put("MOBILE_NO", env.getProperty("paytm.mobile"));
		parameters.put("EMAIL", env.getProperty("paytm.email"));
		parameters.put("ORDER_ID", orderId);
		parameters.put("TXN_AMOUNT", transactionAmount);
		parameters.put("CUST_ID", customerId);
		String checkSum = getCheckSum(parameters);
		parameters.put("CHECKSUMHASH", checkSum);
		System.out.println("parameters:::::---------------------" + parameters);
		modelAndView.addAllObjects(parameters);
		return modelAndView;
	}

	@PostMapping(value = "/pgresponse")
	public String getResponseRedirect(HttpServletRequest request, Model model) {

		Map<String, String[]> mapData = request.getParameterMap();
		TreeMap<String, String> parameters = new TreeMap<String, String>();
		String paytmChecksum = "";
		for (Entry<String, String[]> requestParamsEntry : mapData.entrySet()) {
			if ("CHECKSUMHASH".equalsIgnoreCase(requestParamsEntry.getKey())) {
				paytmChecksum = requestParamsEntry.getValue()[0];
			} else {
				parameters.put(requestParamsEntry.getKey(), requestParamsEntry.getValue()[0]);
			}
		}
		String result;

		boolean isValideChecksum = false;
		System.out.println("RESULT : " + parameters.toString());
		try {
			isValideChecksum = validateCheckSum(parameters, paytmChecksum);
			if (isValideChecksum && parameters.containsKey("RESPCODE")) {
				if (parameters.get("RESPCODE").equals("01")) {
					result = "Payment Successful";
				} else {
					result = "Payment Failed";
				}
			} else {
				result = "Checksum mismatched";
			}
		} catch (Exception e) {
			result = e.toString();
		}
		model.addAttribute("result", result);
		parameters.remove("CHECKSUMHASH");
		model.addAttribute("parameters", parameters);
		return "report";
	}

	private boolean validateCheckSum(TreeMap<String, String> parameters, String paytmChecksum) throws Exception {
		return PaytmChecksum.verifySignature(parameters, paytmBean.getMerchantKey(), paytmChecksum);
	}

	private String getCheckSum(TreeMap<String, String> parameters) throws Exception {
		return PaytmChecksum.generateSignature(parameters, paytmBean.getMerchantKey());
	}

}