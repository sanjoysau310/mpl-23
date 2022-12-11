package com.mpl.services.drive;

import org.springframework.stereotype.Service;

import com.google.api.services.drive.Drive;

@Service
public interface FolderManagerService {
	
	String searchFolderId(String parentId, String folderName, Drive service) throws Exception;
	String findOrCreateFolder(String parentId, String folderName, Drive driveInstance) throws Exception;
	String getFolderId(String path) throws Exception;
}
