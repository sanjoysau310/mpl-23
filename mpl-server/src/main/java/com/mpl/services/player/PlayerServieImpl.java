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
import com.mpl.entities.PlayersView;
import com.mpl.entities.Team;
import com.mpl.exceptions.PlayerNotFoundException;
import com.mpl.payloads.PlayerDto;
import com.mpl.repositories.PlayerRepository;
import com.mpl.repositories.PlayersViewRepository;
import com.mpl.services.email.EmailService;
import com.mpl.services.login.LoginService;
import com.mpl.services.team.TeamService;
import com.mpl.services.drive.FileManagerService;
import com.mpl.utils.CalculateAge;
import com.mpl.utils.CalculateFees;
import com.mpl.utils.EmailSetup;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

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
	private PlayersViewRepository playersViewRepository;
	
	
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
	public Player registerPlayer(HttpServletRequest request, String player, MultipartFile file) {
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
		
		//remove pass words
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
		
		return registeredPlayer;
	}
	
	public Integer generateSequence(String seqName) {
	    PlayerSequence counter = mongoOperations.findAndModify(new Query(Criteria.where("id").is(seqName)),
	      new Update().inc("seq",1), options().returnNew(true).upsert(true),
	      PlayerSequence.class);
	    return !Objects.isNull(counter) ? counter.getSeq() : 1;
	}
	
	public Player updatePlayerPaymentStatus(HttpServletRequest request, Integer pId, String paymentResult) {
		Query query = new Query(Criteria.where("pId").is(pId));
		@SuppressWarnings("static-access")
		Update update = new Update().update("pPaymentStatus", paymentResult);
		Player updatedPlayer = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Player.class);
		
		//fetch login details
		//Login loginBean=mongoOperations.findOne(new Query(Criteria.where("email").is(updatedPlayer.getpEmail())), Login.class);
		
		// send online payment successful details email
		Email email=new Email();
		email.setRecipient(updatedPlayer.getpEmail());
		email.setSubject("Registration Completed | " + updatedPlayer.getpPaymentStatus());
		email.setMsgBody(EmailSetup.getEmailBodyForPayment(request, updatedPlayer));
		emailService.sendSimpleMail(email);
		
		return updatedPlayer;
	}

	@Override
	public List<Player> getAllPlayers() {
		return playerRepository.findAll();
	}

	@Override
	public List<PlayersView> getPlayersView() {
		return playersViewRepository.findAll();
	}
	@Override
	public Player getPlayerByEmail(String pEmail) {
		return playerRepository.findByEmail(pEmail);
	}

	@Override
	public Player getPlayerById(Integer pId) {
		if(!mongoOperations.exists(new Query(Criteria.where("pId").is(pId)), Player.class))
			throw new PlayerNotFoundException(pId);
		return playerRepository.getPlayerById(pId);
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
	public Player editPlayerData(HttpServletRequest request,String playerData) {
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
		
		// send payment successful details email
		if(editedPlayer.getpPaymentStatus().equals("Payment Successful")) {
			Email email=new Email();
			email.setRecipient(editedPlayer.getpEmail());
			email.setSubject("Registration Completed | " + editedPlayer.getpPaymentStatus());
			email.setMsgBody(EmailSetup.getEmailBodyForPayment(request, editedPlayer));
			emailService.sendSimpleMail(email);	
		}
				
		
		return editedPlayer;
	}

	@Override
	public Player updatePlayerData(String playerData) {
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
		
		return updatedPlayer;
	}
	
	@Override
	public String deleteById(Integer pId) {
		if(!mongoOperations.exists(new Query(Criteria.where("pId").is(pId)), Player.class))
			throw new PlayerNotFoundException(pId);
		playerRepository.deleteBypId(pId);
		return "Player with id " +pId+" deleted successfully";
	}
	
	private Player playertDtoToPlayer(PlayerDto playerDto) {
		Player player=new Player();
		
//		player.setpId(playerDto.getPId());
//		player.setpName(playerDto.getPName());
//		player.setpEmail(playerDto.getPEmail());
//		player.setpPhone(playerDto.getPPhone());
//		player.setpWhatsapp(playerDto.getPWhatsapp());
//		player.setpDob(playerDto.getPDob());
//		player.setpImage(playerDto.getPImage());
//		player.setpRole(playerDto.getPRole());
//		player.setpBatting(playerDto.getPBatting());
//		player.setpBowling(playerDto.getPBowling());
//		player.setpKit(playerDto.getPKit());
//		player.setpFees(playerDto.getPFees());
//		player.setpBasePrice(playerDto.getPBasePrice());
//		player.setpSoldPrice(playerDto.getPBasePrice());
//		player.setpTeam(playerDto.getPTeam());
//		player.setpStatus(playerDto.getPStatus());
//		player.setpPaymentMode(playerDto.getPPaymentMode());
//		player.setpPaymentStatus(playerDto.getPPaymentStatus());
		return objectMapper.convertValue(playerDto, Player.class);
	}

	private PlayerDto playerToPlayerDto(Player player) {
		PlayerDto playerDto=new PlayerDto();
		
//		playerDto.setPId(player.getpId());
//		playerDto.setPName(player.getpName());
//		playerDto.setPEmail(player.getpEmail());
//		playerDto.setPPhone(player.getpPhone());
//		playerDto.setPWhatsapp(player.getpWhatsapp());
//		playerDto.setPDob(player.getpDob());
//		playerDto.setPImage(player.getpImage());
//		playerDto.setPRole(player.getpRole());
//		playerDto.setPBatting(player.getpBatting());
//		playerDto.setPBowling(player.getpBowling());
//		playerDto.setPKit(player.getpKit());
//		playerDto.setPFees(player.getpFees());
//		playerDto.setPBasePrice(player.getpBasePrice());
//		playerDto.setPSoldPrice(player.getpSoldPrice());
//		playerDto.setPTeam(player.getpTeam());
//		playerDto.setPStatus(player.getpStatus());
//		playerDto.setPPaymentMode(player.getpPaymentMode());
//		playerDto.setPPaymentStatus(player.getpPaymentSatus());
		return objectMapper.convertValue(player, PlayerDto.class);
	}

}
