package com.mpl.services.drive;

import java.util.List;

import org.springframework.stereotype.Service;
import java.io.IOException;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.services.drive.model.File;

@Service
public interface FileManagerService {
	
	static final String PATH = "MPL 2023 Player Images";
	String uploadFile(MultipartFile file, String fileName);
	File searchFileById(String id) throws IOException, GeneralSecurityException;
	void downloadFile(String id, OutputStream outputStream) throws IOException, GeneralSecurityException;
	void deleteFile(String fileId) throws Exception;
	List<File> listFolderContent(String parentId) throws IOException, GeneralSecurityException;
}
