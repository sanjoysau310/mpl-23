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
import com.mpl.entities.Login;
import com.mpl.entities.Player;
import com.mpl.entities.PlayersView;
import com.mpl.payloads.PlayerDto;
import com.mpl.repositories.LoginRepository;
import com.mpl.repositories.PlayerRepository;
import com.mpl.repositories.PlayersViewRepository;
import com.mpl.services.email.EmailService;
import com.mpl.services.login.LoginService;
import com.mpl.services.drive.FileManagerService;
import com.mpl.utils.CalculateAge;
import com.mpl.utils.EmailSetup;
import com.mpl.utils.GeneratePassword;


import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

@Service
public class PlayerServieImpl implements PlayerService {

	@Autowired
	private PlayerRepository playerRepository;
	
	@Autowired
	private LoginService loginService;

	@Autowired
	private PlayersViewRepository playersViewRepository;

	@Autowired
	private FileManagerService fileManagerService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private Email emailBean;

	@Autowired
	private MongoOperations mongoOperations;
	
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public Player addPlayer(HttpServletRequest request, String player, MultipartFile file) {
		
		Player playerData = null;
		try {
			objectMapper.readValue(player, Player.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		playerData.setpFees(CalculateAge.getAge(playerData.getpDob()) >= 21 ? 300 : 150);

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		String fileNameToUpload = playerData.getpName() + "_" + fileName;
		String fileId = fileManagerService.uploadFile(file, fileNameToUpload);
		if (fileId == null) {
			return null;
		}
		playerData.setpImage(fileId);
		Player registeredPlayer = playerRepository.save(playerData);
		
		//save login details
		Login loginBean=loginService.createLoginDetails(playerData.getpEmail(),playerData.getpPhone());
		
		// send registration email with cash pay
		if (playerData.getpPaymentMode().equals("Cash")) {
			emailBean.setRecipient(registeredPlayer.getpEmail());
			emailBean.setSubject("Registration successfull | Payment Pending");
			emailBean.setMsgBody(EmailSetup.getEmailBodyForRegistration(request, registeredPlayer, loginBean));
			emailService.sendSimpleMail(emailBean);
		}
		return registeredPlayer;
	}

	@Override
	public List<Player> getAllPlayers() {
		return playerRepository.findAll();
	}

	public List<PlayersView> getPlayersView() {
		return playersViewRepository.findAll();
	}

	@Override
	public Player getPlayerById(Integer pId) {
		return playerRepository.getPlayerById(pId);
	}

	public void updatePlayerPaymentStatus(HttpServletRequest request, Integer pId, String paymentResult) {
		Query query = new Query(Criteria.where("pId").is(pId));
		@SuppressWarnings("static-access")
		Update update = new Update().update("pPaymentStatus", paymentResult);
		Player updatedPlayer = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Player.class);
		
		
		//fetch login details
		
		//LoginBean loginBean=loginRepository.getLoginDetailsByEmail(updatedPlayer.getpEmail());
		//LoginBean loginBean=mongoOperations.findById(updatedPlayer.getpEmail(), LoginBean.class);
		Login loginBean=mongoOperations.findOne(new Query(Criteria.where("email").is(updatedPlayer.getpEmail())), Login.class);
		
		// send online payment details email
		emailBean.setRecipient(updatedPlayer.getpEmail());
		emailBean.setSubject("Registration successfull | " + updatedPlayer.getpPaymentSatus());
		emailBean.setMsgBody(EmailSetup.getEmailBodyForRegistration(request, updatedPlayer,loginBean));
		emailService.sendSimpleMail(emailBean);
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
