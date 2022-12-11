package com.mpl.services.email;

import org.springframework.stereotype.Service;

import com.mpl.entities.Email;

@Service
public interface EmailService {
	String sendSimpleMail(Email details);
	String sendMailWithAttachment(Email details);
}
