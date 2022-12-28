package com.mpl.services.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mpl.entities.Email;
import com.mpl.entities.Player;
import com.mpl.entities.PlayerSequence;
import com.mpl.exceptions.PlayerNotFoundException;
import com.mpl.payloads.PlayerDto;
import com.mpl.payloads.PlayersViewDto;
import com.mpl.repositories.PlayerRepository;
import com.mpl.services.drive.FileManagerService;
import com.mpl.services.email.EmailService;
import com.mpl.services.login.LoginService;
import com.mpl.services.team.TeamService;
import com.mpl.utils.CalculateFees;
import com.mpl.utils.EmailSetup;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

@Service
public class PlayerServieImpl implements PlayerService {

	@Autowired
	private MongoOperations mongoOperations;
	
	@Autowired
	private PlayerRepository playerRepository;
	
	@Autowired
	private LoginService loginService;

	@Autowired
	private FileManagerService fileManagerService;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private TeamService teamService;
	
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public PlayerDto registerPlayer(HttpServletRequest request, String player, MultipartFile file) {
		Player playerData = null;
		try {
			playerData=objectMapper.readValue(player, Player.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		playerData.setpId(generateSequence(playerData.getSequenceName()));
		playerData.setpFees(CalculateFees.getFees(playerData.getpDob(), playerData.getpKit()));
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		String fileNameToUpload = playerData.getpName() + "_" + fileName;
		String fileId = fileManagerService.uploadFile(file, fileNameToUpload);
		if (fileId == null) {
			return null;
		}
		playerData.setpImage(fileId);
		//save login details
		loginService.createLoginDetails(playerData.getpEmail(), playerData.getpPassword(), playerData.getpPhone());
		//remove passwords
		playerData.setpPassword("");
		playerData.setpConfirmPassword("");
		//add player details
		Player registeredPlayer = playerRepository.save(playerData);
		// send registration email
		Email email=new Email();
		email.setRecipient(registeredPlayer.getpEmail());
		email.setSubject("Registration successfull | Payment Pending");
		email.setMsgBody(EmailSetup.getEmailBodyForRegistration(request, registeredPlayer));
		emailService.sendSimpleMail(email);
		
		return playerToPlayerDto(registeredPlayer);
	}
	
	public Integer generateSequence(String seqName) {
	    PlayerSequence counter = mongoOperations.findAndModify(new Query(Criteria.where("id").is(seqName)),
	      new Update().inc("seq",1), options().returnNew(true).upsert(true),
	      PlayerSequence.class);
	    return !Objects.isNull(counter) ? counter.getSeq() : 1;
	}
	
	public PlayerDto updatePlayerPaymentStatus(HttpServletRequest request, Integer pId, String paymentResult) {
		Query query = new Query(Criteria.where("pId").is(pId));
		@SuppressWarnings("static-access")
		Update update = new Update().update("pPaymentStatus", paymentResult);
		Player updatedPlayer = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Player.class);
		// send online payment successful details email
		Email email=new Email();
		email.setRecipient(updatedPlayer.getpEmail());
		email.setSubject("Registration Completed | " + updatedPlayer.getpPaymentStatus());
		email.setMsgBody(EmailSetup.getEmailBodyForPayment(request, updatedPlayer));
		emailService.sendSimpleMail(email);
		
		return playerToPlayerDto(updatedPlayer);
	}

	@Override
	public List<PlayerDto> getAllPlayers() {
		List<Player> playerList=playerRepository.findAll();
		List<PlayerDto> playerDtoList=new ArrayList<>();
		for(Player player:playerList)
			playerDtoList.add(playerToPlayerDto(player));
		return playerDtoList;
	}

	@Override
	public List<PlayersViewDto> getPlayersView() {
		List<Player> playerList=playerRepository.findAll();
		List<PlayersViewDto> playerViewDtoList=new ArrayList<>();
		for(Player player:playerList)
			playerViewDtoList.add(playerToPlayerViewDto(player));
		return playerViewDtoList;
	}
	@Override
	public PlayerDto getPlayerByEmail(String pEmail) {
		return playerToPlayerDto(playerRepository.findByEmail(pEmail));
	}

	@Override
	public PlayerDto getPlayerById(Integer pId) {
		if(!mongoOperations.exists(new Query(Criteria.where("pId").is(pId)), Player.class))
			throw new PlayerNotFoundException(pId);
		return playerToPlayerDto(playerRepository.getPlayerById(pId));
	}

	@Override
	public boolean checkEmailExists(String pEmail) {
		return mongoOperations.query(Player.class).matching(new Query(Criteria.where("pEmail").is(pEmail)))
				.exists();
	}

	@Override
	public boolean checkPhoneExists(String pPhone) {
		return mongoOperations.query(Player.class).matching(new Query(Criteria.where("pPhone").is(pPhone)))
				.exists();
	}
	
	@Override
	public PlayerDto editPlayerData(HttpServletRequest request,String playerData) {
		Player player = null;
		try {
			player=objectMapper.readValue(playerData, Player.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		Query query = new Query(Criteria.where("pId").is(player.getpId()));
		Update update = new Update();
		update.set("pKit", player.getpKit());
		update.set("pBasePrice", player.getpBasePrice());
		update.set("pTeam", player.getpTeam());
		update.set("pPaymentMode", player.getpPaymentMode());
		update.set("pPaymentStatus", player.getpPaymentStatus());
		Player editedPlayer = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Player.class);
		
		//update team table
		//teamService.editPlayerTeam(playerData);
		
		// send payment successful details email
		if(editedPlayer.getpPaymentStatus().equals("Payment Successful")) {
			Email email=new Email();
			email.setRecipient(editedPlayer.getpEmail());
			email.setSubject("Registration Completed | " + editedPlayer.getpPaymentStatus());
			email.setMsgBody(EmailSetup.getEmailBodyForPayment(request, editedPlayer));
			emailService.sendSimpleMail(email);	
		}
		return playerToPlayerDto(editedPlayer);
	}

	@Override
	public PlayerDto updatePlayerData(String playerData) {
		Player player = null;
		try {
			player=objectMapper.readValue(playerData, Player.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		Query query = new Query(Criteria.where("pId").is(player.getpId()));
		Update update = new Update();
		update.set("pTeam", player.getpTeam());
		update.set("pSoldPrice", player.getpSoldPrice());
		update.set("pStatus", player.getpStatus());
		Player updatedPlayer = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Player.class);
		//update to teams table
		//teamService.updatePlayerTeam(player);
		return playerToPlayerDto(updatedPlayer);
	}
	
	@Override
	public String deleteById(Integer pId) {
		Player player=playerRepository.getPlayerById(pId);
		if(!mongoOperations.exists(new Query(Criteria.where("pId").is(pId)), Player.class))
			throw new PlayerNotFoundException(pId);
		loginService.deleteBypEmail(player.getpEmail());
		playerRepository.deleteBypId(pId);
		return "Player with id " +pId+" deleted successfully";
	}
	
	private Player playertDtoToPlayer(PlayerDto playerDto) {
		return objectMapper.convertValue(playerDto, Player.class);
	}

	private PlayerDto playerToPlayerDto(Player player) {
		return objectMapper.convertValue(player, PlayerDto.class);
	}

	private PlayersViewDto playerToPlayerViewDto(Player player) {
		return objectMapper.convertValue(player, PlayersViewDto.class);
	}
}
