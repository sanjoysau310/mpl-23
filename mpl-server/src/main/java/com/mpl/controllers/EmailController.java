package com.mpl.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mpl.entities.Email;
import com.mpl.services.email.EmailService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/email")
public class EmailController {

	@Autowired
	private EmailService emailService;

	@PostMapping("/sendmail")
	public String sendMail( @RequestBody Email details) {
		return emailService.sendSimpleMail(details);
	}

	@PostMapping("/sendmailwithattachment")
	public String sendMailWithAttachment(@RequestBody Email details) {
		return emailService.sendMailWithAttachment(details);
	}
}
