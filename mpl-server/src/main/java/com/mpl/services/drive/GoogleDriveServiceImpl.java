package com.mpl.services.drive;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.util.Value;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;

@Service
public class GoogleDriveServiceImpl implements GoogleDriveService {

	// private static final JsonFactory JSON_FACTORY =
	// GsonFactory.getDefaultInstance();
	// private static final List<String> scopes =
	// Collections.singletonList(DriveScopes.DRIVE);

	private static final String TOKENS_DIRECTORY_PATH = "tokens";
	private static final String CREDENTIALS_FILE_PATH ="classpath:client_secret_prod.json";
	private static final String CALLBACK_URI ="http://192.168.29.245.nip.io:8080/Callback";

	@Value("${google.secret.key.path}")
	private static String secretKey;

	@Value("${google.oauth.callback.uri}")
	private static String callbackURI;

	@Value("${google.credentials.folder.path}")
	private static String storedCredsFile;

	// private static final String APPLICATION_NAME = "MPL 2023";

	@Override
	public Drive getInstance() throws GeneralSecurityException, IOException {
		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
				.setApplicationName(APPLICATION_NAME).build();
		return service;
	}

	@Override
	public Credential getCredentials(NetHttpTransport HTTP_TRANSPORT) throws IOException {
//		System.out.println("csecret key-" + CREDENTIALS_FILE_PATH);
//		System.out.println("call back uri-" + CALLBACK_URI);
//		System.out.println("cread path-" + TOKENS_DIRECTORY_PATH);

		java.io.File filePath = ResourceUtils.getFile(CREDENTIALS_FILE_PATH);
		InputStream inputFile = new FileInputStream(filePath);

		// InputStream in =
		// FileManagerService.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
		System.out.println("json file path input stream-" + inputFile);

		GoogleClientSecrets secrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(inputFile));
		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY,
				secrets, scopes).setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
				.setAccessType("offline").build();
		// System.out.println(""+HttpServletRequest.getHeader("origin"));
		LocalServerReceiver receiver = new LocalServerReceiver.Builder().setHost("192.168.29.245.nip.io").setPort(8081).build();
		//LocalServerReceiver receiver = new LocalServerReceiver.Builder().setCallbackPath(CALLBACK_URI).build();
		return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
	}

}
