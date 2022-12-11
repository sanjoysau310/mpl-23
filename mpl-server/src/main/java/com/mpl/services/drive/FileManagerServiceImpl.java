package com.mpl.services.drive;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
public class FileManagerServiceImpl implements FileManagerService {

	@Autowired
	private GoogleDriveService googleDriveService;
	
	@Autowired
	private FolderManagerService folderManagerService;

	@Override
	public String uploadFile(MultipartFile file, String fileName) {
		try {
			String folderId = folderManagerService.getFolderId(PATH);
			if (null != file) {
				File fileMetadata = new File();
				fileMetadata.setParents(Collections.singletonList(folderId));
				fileMetadata.setName(fileName);
				File uploadFile = googleDriveService.getInstance().files().create(fileMetadata,
						new InputStreamContent(file.getContentType(), new ByteArrayInputStream(file.getBytes())))
						.setFields("id").execute();
				return uploadFile.getId();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public File searchFileById(String id) throws IOException, GeneralSecurityException {
		return googleDriveService.getInstance().files().get(id).execute();
	}

	@Override
	public void downloadFile(String id, OutputStream outputStream) throws IOException, GeneralSecurityException {
		if (id != null) {
			String fileId = id;
			googleDriveService.getInstance().files().get(fileId).executeMediaAndDownloadTo(outputStream);
		}
	}

	@Override
	public void deleteFile(String fileId) throws Exception {
		googleDriveService.getInstance().files().delete(fileId).execute();
	}

	@Override
	public List<File> listFolderContent(String parentId) throws IOException, GeneralSecurityException {
		if (parentId == null) {
			parentId = "root";
		}
		String query = "'" + parentId + "' in parents";
		FileList result = googleDriveService.getInstance().files().list().setQ(query).setPageSize(10)
				.setFields("nextPageToken, files(id, name)").execute();
		return result.getFiles();
	}

}
