package com.mpl.service;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;
import com.google.api.client.http.InputStreamContent;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;

@Service
public class FileManagerService {
	private static final String PATH = "MPL 2023 Player Images";
	
	public static String uploadFile(MultipartFile file, String fileName) {
		try {
			String folderId = FolderManagerService.getFolderId(PATH);
			if (null != file) {
				File fileMetadata = new File();
				fileMetadata.setParents(Collections.singletonList(folderId));
				fileMetadata.setName(fileName);
				File uploadFile = GoogleDriveService.getInstance().files().create(fileMetadata,
						new InputStreamContent(file.getContentType(), new ByteArrayInputStream(file.getBytes())))
						.setFields("id").execute();
				return uploadFile.getId();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static File searchFileById(String id) throws IOException, GeneralSecurityException {
		return GoogleDriveService.getInstance().files().get(id).execute();
	}

	public static void downloadFile(String id, OutputStream outputStream) throws IOException, GeneralSecurityException {
		if (id != null) {
			String fileId = id;
			GoogleDriveService.getInstance().files().get(fileId).executeMediaAndDownloadTo(outputStream);
		}
	}

	public static void deleteFile(String fileId) throws Exception {
		GoogleDriveService.getInstance().files().delete(fileId).execute();
	}
	
	public static List<File> listFolderContent(String parentId) throws IOException, GeneralSecurityException {
		if (parentId == null) {
			parentId = "root";
		}
		String query = "'" + parentId + "' in parents";
		FileList result = GoogleDriveService.getInstance().files().list().setQ(query).setPageSize(10)
				.setFields("nextPageToken, files(id, name)").execute();
		return result.getFiles();
	}

}
