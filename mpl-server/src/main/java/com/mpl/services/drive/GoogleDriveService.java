package com.mpl.services.drive;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;

@Service
public interface GoogleDriveService {
		static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
		static final List<String> scopes = Collections.singletonList(DriveScopes.DRIVE);
//		static final String CREDENTIALS_FILE_PATH_TEST = "classpath:client_secret.json";
//		static final String TOKENS_DIRECTORY_PATH_PROD = "tokens";
//		static final String CREDENTIALS_FILE_PATH_PROD ="classpath:client_secret_prod.json";
//		static final String CALLBACK_URI_TEST ="http://192.168.29.245.nip.io:8080/Callback";
//		static final String APPLICATION_NAME = "MPL 2023";

		Drive getInstance() throws GeneralSecurityException, IOException;
		Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException;
}
