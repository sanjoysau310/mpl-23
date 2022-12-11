package com.mpl.services.email;

import java.io.File;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.mpl.entities.Email;
import com.mpl.utils.EmailSetup;


@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender javaMailSender;

	@Value("${spring.mail.username}")
	private String sender;

	@Override
	public String sendSimpleMail(Email details) {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		try {
			mimeMessage.setFrom(sender);
			mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(details.getRecipient()));
			mimeMessage.setContent(details.getMsgBody(), "text/html; charset=utf-8");
			mimeMessage.setSubject(details.getSubject());
				javaMailSender.send(mimeMessage);
				return "Mail sent Successfully";
		} catch (MessagingException e) {
			return "Error while sending mail!!!";
		}
	}
		
	@Override
	public String sendMailWithAttachment(Email details) {
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper;
		try {
			mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setFrom(sender);
			mimeMessageHelper.setTo(details.getRecipient());
			mimeMessageHelper.setText(details.getMsgBody());
			mimeMessageHelper.setSubject(details.getSubject());
			FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));
			mimeMessageHelper.addAttachment(file.getFilename(), file);
			javaMailSender.send(mimeMessage);
			return "Mail sent Successfully";
		} catch (MessagingException e) {
			return "Error while sending mail!!!";
		}
	}
}
