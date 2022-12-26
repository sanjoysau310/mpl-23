package com.mpl;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication()
public class MplServerApplication implements CommandLineRunner{
	public static void main(String[] args) {
		SpringApplication.run(MplServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		InetAddress ip = null;
		try {
			ip = InetAddress.getLocalHost();
			
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		//internet ip
		System.out.println("Current IP address::::::::-------------------" + ip.getHostName());
		System.out.println("Current IP address::::::::-------------------" + ip.getHostAddress());
	}
}
