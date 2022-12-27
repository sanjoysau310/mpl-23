package com.mpl.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mpl.payloads.PlayerDto;
import com.mpl.payloads.PlayersViewDto;
import com.mpl.services.player.PlayerService;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/player")
public class PlayerController {
	
	@Autowired
	private PlayerService playerService;

	@PostMapping(path = "/register", consumes = { MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE })
	public PlayerDto registerPlayer( HttpServletRequest request,@RequestParam("player") String player, @RequestParam("pImage") MultipartFile file) {
		return playerService.registerPlayer(request, player,file);	
	}
	
	@GetMapping("/checkemail/{pEmail}")
	public boolean checkEmailExists(@PathVariable String pEmail) {
		return playerService.checkEmailExists(pEmail);
	}
	
	@GetMapping("/checkphone/{pPhone}")
	public boolean checkPhoneExists(@PathVariable String pPhone) {
		return playerService.checkPhoneExists(pPhone);
	}

	@GetMapping("/playerslist")
	List<PlayerDto> getAllPlayers() {
		return playerService.getAllPlayers();
	}
	
	@GetMapping("/playersview")
	List<PlayersViewDto> getPlayersView() {
		return playerService.getPlayersView();
	}
	
	@GetMapping("/playerview/{pEmail}")
	PlayerDto getPlayerView(@PathVariable String pEmail) {
		return playerService.getPlayerByEmail(pEmail);
	}

	@GetMapping("/playerid/{pId}")
	PlayerDto getPlayer(@PathVariable Integer pId) {
		return playerService.getPlayerById(pId);
	}
	
	@PutMapping("/editplayer")
	PlayerDto editPlayer(HttpServletRequest request,@RequestBody String playerData) {
		return playerService.editPlayerData(request,playerData);
	}
	
	//@PreAuthorize("hasrole('ADMIN')")
	@PutMapping("/updateplayer")
	PlayerDto updatePlayer(@RequestBody String playerData) {
		return playerService.updatePlayerData(playerData);
		
	}
	
	@DeleteMapping("/deleteplayer/{pId}")
	String deleteUser(@PathVariable Integer pId) {
		return playerService.deleteById(pId);
	}
	
//	@PutMapping("/player/{id}")
//	Player updateUser(@PathVariable int id, @RequestBody Player playerData) {
//		return playerRepository.findById(id)
//				.map(player->{
//					player.setpName(playerData.getpName());
//					player.setpEmail(playerData.getpEmail());
//					player.setpPayment(playerData.getpPayment());
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
	
	//ORDERID=e471bac3-fb14-4e95-94de-9c6ff243d0ff
	//txnId"==e471bac3-fb14-4e95-94de-9c6ff243d0ff"
	
	//https://drive.google.com/drive/folders/1hAp0VRJsZSJLSXcIj0qB3IBsSIG0KKQV?usp=share_link
		//1LLOtBjgLx2w5UnL_vjgJDrWzhtRhNO9L---parentID
//		@GetMapping({ "/list", "/list/{parentId}" })
//		public ResponseEntity<List<File>> list(
//				@PathVariable(required = false) String parentId) throws IOException, GeneralSecurityException {
//			List<File> files = FileManagerService.listFolderContent(parentId);
//			return ResponseEntity.ok(files);
//		}
//		//1LLOtBjgLx2w5UnL_vjgJDrWzhtRhNO9L
//		//1HjH_JicbITeANbcIYGK3XxiByC2Hssqv
//		@GetMapping("/playerimage/{id}")
//		public File getPlayerImagebyId(@PathVariable String id) throws IOException, GeneralSecurityException {
//			File file = FileManagerService.searchFileById(id);
//			return file;
//		}
//		@GetMapping("/download/{id}")
//		public void download(@PathVariable String id, HttpServletResponse response)
//				throws IOException, GeneralSecurityException {
//			FileManagerService.downloadFile(id, response.getOutputStream());
//		}
//		@GetMapping("/delete/{id}")
//		public void delete(@PathVariable String id) throws Exception {
//			FileManagerService.deleteFile(id);
//		}
}
