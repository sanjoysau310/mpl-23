package com.mpl.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.Value;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;

@Service
public class GoogleDriveService {
	
	// private static HttpTransport HTTP_TRANPORT = new NetHttpTransport();
		private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
		private static final List<String> scopes = Collections.singletonList(DriveScopes.DRIVE);

		private static final String TOKENS_DIRECTORY_PATH = "tokens";
		private static final String CREDENTIALS_FILE_PATH = "classpath:client_secret.json";

		@Value("${google.secret.key.path}")
		private static Resource secretKey;

		@Value("${google.oauth.callback.uri}")
		private String oauthURI;

		@Value("${google.credentials.folder.path}")
		private static Resource credFile;

		private static final String APPLICATION_NAME = "My Project 2023";

		public static Drive getInstance() throws GeneralSecurityException, IOException {
			final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
			Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
					.setApplicationName(APPLICATION_NAME).build();
			return service;
		}

		private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
			System.out.println("cread path-" + credFile);
			
			java.io.File filePath=ResourceUtils.getFile(CREDENTIALS_FILE_PATH);
			InputStream inputFile=new FileInputStream(filePath);
			
			//InputStream in = FileManagerService.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
			System.out.println("json file path input stream-"+inputFile);
			
		     GoogleClientSecrets secrets = GoogleClientSecrets.load(JSON_FACTORY,
					new InputStreamReader(inputFile));
			GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY,
					secrets, scopes).setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
					.setAccessType("offline").build();
			LocalServerReceiver receiver = new LocalServerReceiver.Builder().setHost("localhost").setPort(8081)
					.build();
			return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
		}
}
