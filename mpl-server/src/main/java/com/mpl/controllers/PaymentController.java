package com.mpl.controllers;

import java.net.URI;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mpl.entities.Payment;
import com.mpl.payloads.PlayerDto;
import com.mpl.services.payment.PaymentService;
import com.mpl.services.player.PlayerService;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;
	
	@Autowired
	private PlayerService playerService;
	
	@GetMapping(value = "/pgdetails/{pId}")
	public TreeMap<String, String> getPaytmDetails(@PathVariable Integer pId) throws Exception {
		return paymentService.getPaytmDetails(pId);
	}

	@PostMapping(value = "/pgresponse")
	public ResponseEntity<?> getResponse(HttpServletRequest request) {
		
		Payment payment=paymentService.getPaymentResponse(request);
		//save payment status to player table
		//URIBuilder uriBuilder=new URIBuilder();
		//uriBuilder..addParameter("Payment Status", payment.getDetails().get("result"));
		PlayerDto player=playerService.updatePlayerPaymentStatus(request, payment.getpId(),payment.getDetails().get("result"));
		if(payment.getDetails().get("STATUS").equals("TXN_SUCCESS")) {
			return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:4200/playerview/"+player.getpEmail())).build();
		} else if(payment.getDetails().get("STATUS").equals("TXN_FAILURE")) {
			return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:4200/playerview/"+player.getpEmail())).build();
		}
		return null;
	}
}