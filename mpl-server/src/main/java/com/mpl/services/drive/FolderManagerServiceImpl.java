package com.mpl.services.drive;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;

@Service
public class FolderManagerServiceImpl implements FolderManagerService{
	
	@Autowired
	private GoogleDriveService googleDriveService;
	
	@Override
	public String searchFolderId(String parentId, String folderName, Drive service) throws Exception {
		String folderId = null;
		String pageToken = null;
		FileList result = null;

		File fileMetadata = new File();
		fileMetadata.setMimeType("application/vnd.google-apps.folder");
		fileMetadata.setName(folderName);

		do {
			String query = " mimeType = 'application/vnd.google-apps.folder' ";
			if (parentId == null) {
				query = query + " and 'root' in parents";
			} else {
				query = query + " and '" + parentId + "' in parents";
			}
			result = service.files().list().setQ(query).setSpaces("drive").setFields("nextPageToken, files(id, name)")
					.setPageToken(pageToken).execute();

			for (File file : result.getFiles()) {
				if (file.getName().equalsIgnoreCase(folderName)) {
					folderId = file.getId();
				}
			}
			pageToken = result.getNextPageToken();
		} while (pageToken != null && folderId == null);

		return folderId;
	}

	// create a folder if it does not exist in Google Drive.
	@Override
	public String findOrCreateFolder(String parentId, String folderName, Drive driveInstance) throws Exception {
		String folderId = searchFolderId(parentId, folderName, driveInstance);
		// Folder already exists, so return id
		if (folderId != null) {
			return folderId;
		}
		// Folder dont exists, create it and return folderId
		File fileMetadata = new File();
		fileMetadata.setMimeType("application/vnd.google-apps.folder");
		fileMetadata.setName(folderName);
		//fileMetadata.setParents(Collections.singletonList(folderId));

		if (parentId != null) {
			fileMetadata.setParents(Collections.singletonList(parentId));
		}
		return driveInstance.files().create(fileMetadata).setFields("id").execute().getId();
	}

	@Override
	public String getFolderId(String path) throws Exception {
		String parentId = null;
		String[] folderNames = path.split("/");

		Drive driveInstance = googleDriveService.getInstance();
		for (String name : folderNames) {
			parentId = findOrCreateFolder(parentId, name, driveInstance);
		}
		return parentId;
	}

}
