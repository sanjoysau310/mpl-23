package com.mpl.controllers;


import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.services.drive.model.File;
import com.mpl.services.drive.FileManagerService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/gallery")
public class FileController {
	
	@Autowired
	private FileManagerService fileManagerService;
	
	//https://drive.google.com/drive/folders/1hAp0VRJsZSJLSXcIj0qB3IBsSIG0KKQV?usp=share_link
			//1LLOtBjgLx2w5UnL_vjgJDrWzhtRhNO9L---parentID
			@GetMapping({ "/galleryimages"})
			public ResponseEntity<List<File>> galleryImages() throws IOException, GeneralSecurityException {
				final String folderId="1hAp0VRJsZSJLSXcIj0qB3IBsSIG0KKQV";
				List<File> files = fileManagerService.listFolderContent(folderId);
				return ResponseEntity.ok(files);
			}

}
