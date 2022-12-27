package com.mpl.services.drive;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.GeneralSecurityException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;

@Service
public class GoogleDriveServiceImpl implements GoogleDriveService {

	@Value("${google.secret.key.path}")
	Resource secretKeyPath;

	@Value("${google.oauth.callback.uri}")
	String callbackURL;

	@Value("${google.credentials.folder.path}")
	String storedCredsPath;
	
	@Value("${google.application.name}")
	String applicationName;

	@Override
	public Drive getInstance() throws GeneralSecurityException, IOException {
		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
				.setApplicationName(applicationName).build();
				//.setApplicationName(APPLICATION_NAME).build();
		return service;
	}

	@Override
	public Credential getCredentials(NetHttpTransport HTTP_TRANSPORT) throws IOException {
		//java.io.File filePath = ResourceUtils.getFile(CREDENTIALS_FILE_PATH_PROD);
		InputStream inputFilePath = null;
		try {
			inputFilePath = secretKeyPath.getInputStream();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		//InputStream inputFile = new FileInputStream(filePath);
		GoogleClientSecrets secrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(inputFilePath));
		//GoogleClientSecrets secrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(inputFile));
		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY,
				secrets, scopes)
				.setDataStoreFactory(new FileDataStoreFactory(new java.io.File(storedCredsPath)))
				//.setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH_PROD)))
				.setAccessType("offline").build();
		// internet ip
		// LocalServerReceiver.Builder().setHost(ip.getHostAddress()).setPort(8888).build();
		LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
		// LocalServerReceiver receiver1 = new
		// LocalServerReceiver.Builder().setHost(ip.toString()).setPort(8081).build();
		return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
	}

}
