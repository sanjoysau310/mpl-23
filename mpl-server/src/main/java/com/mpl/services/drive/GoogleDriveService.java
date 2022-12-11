package com.mpl.services.drive;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

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
		static final String TOKENS_DIRECTORY_PATH = "tokens";
		static final String CREDENTIALS_FILE_PATH = "classpath:client_secret.json";
		static final String APPLICATION_NAME = "My Project 2023";

		Drive getInstance() throws GeneralSecurityException, IOException;
		Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException;
}
