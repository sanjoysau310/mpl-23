package com.mpl.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.services.drive.model.File;
import com.mpl.bean.Player;
import com.mpl.exception.PlayerNotFoundException;
import com.mpl.repo.PlayerRepository;
import com.mpl.service.FileManagerService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
public class PlayerController {

	@Autowired
	private PlayerRepository playerRepository;

	@PostMapping(path = "/addplayer", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public Player registerPlayer(@RequestParam("player") String player, @RequestParam("pImage") MultipartFile file)
			throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Player newPlayer = mapper.readValue(player, Player.class);
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		String fileNameToUpload = newPlayer.getpName()+"_"+fileName;
		String fileId = FileManagerService.uploadFile(file, fileNameToUpload);
		System.out.println("File id after upload::::::::::::------------------------"+fileId);
		if (fileId == null) {
			return null;
		}
		newPlayer.setpImage(fileId);
		Player registeredPlayer = playerRepository.save(newPlayer);
		return registeredPlayer;
	}

	@PostMapping(value = "/uploadfile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> uploadSingleFile(@RequestParam("pImage") MultipartFile file) throws IOException{
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		String fileId = FileManagerService.uploadFile(file, fileName);
		//System.out.println("File id after upload::::::::::::------------------------"+fileId);
		if (fileId == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		return ResponseEntity.ok("Success, FileId: " + fileId);
	}
	//1LLOtBjgLx2w5UnL_vjgJDrWzhtRhNO9L---parentID
	@GetMapping({ "/list", "/list/{parentId}" })
	public ResponseEntity<List<File>> list(
			@PathVariable(required = false) String parentId) throws IOException, GeneralSecurityException {
		List<File> files = FileManagerService.listFolderContent(parentId);
		return ResponseEntity.ok(files);
	}
	//1LLOtBjgLx2w5UnL_vjgJDrWzhtRhNO9L
	//1HjH_JicbITeANbcIYGK3XxiByC2Hssqv
	@GetMapping("/playerimage/{id}")
	public File getPlayerImagebyId(@PathVariable String id) throws IOException, GeneralSecurityException {
		File file = FileManagerService.searchFileById(id);
		return file;
	}
	
	@GetMapping("/download/{id}")
	public void download(@PathVariable String id, HttpServletResponse response)
			throws IOException, GeneralSecurityException {
		FileManagerService.downloadFile(id, response.getOutputStream());
	}

	@GetMapping("/delete/{id}")
	public void delete(@PathVariable String id) throws Exception {
		FileManagerService.deleteFile(id);
	}

	@GetMapping("/players")
	List<Player> getAllPlayers() {
		return playerRepository.findAll();
	}

	@GetMapping("/player/{id}")
	Player getPlayer(@PathVariable int id) {
		return playerRepository.findById(id).orElseThrow(() -> new PlayerNotFoundException(id));
	}
//	
//	@PutMapping("/player/{id}")
//	Player updateUser(@PathVariable int id, @RequestBody Player newPlayer) {
//		return playerRepository.findById(id)
//				.map(player->{
//					player.setpName(newPlayer.getpName());
//					player.setpEmail(newPlayer.getpEmail());
//					player.setpPayment(newPlayer.getpPayment());
//					return playerRepository.save(player);
//				})
//				.orElseThrow(()->new PlayerNotFoundException(id));
//	}
//	
//	@DeleteMapping("/player/{id}")
//	String deleteUser(@PathVariable int id) {
//		if(!playerRepository.existsById(id))
//			throw new PlayerNotFoundException(id);
//		playerRepository.deleteById(id);
//		return "Player with id " +id+" deleted successfully";
//	}
}
