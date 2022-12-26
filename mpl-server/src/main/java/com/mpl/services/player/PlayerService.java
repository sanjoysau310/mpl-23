package com.mpl.services.player;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mpl.entities.Player;
import com.mpl.entities.PlayersView;


@Service
public interface PlayerService {
	Player registerPlayer(HttpServletRequest request, String player, MultipartFile file);
	List<Player> getAllPlayers();
	List<PlayersView> getPlayersView();
	Player getPlayerByEmail(String pEmail);
	Player getPlayerById(Integer pId);
	Player updatePlayerPaymentStatus(HttpServletRequest request,Integer pId, String paymentResult);
	boolean checkEmailExists(String pEmail);
	boolean checkPhoneExists(String pPhone);
	Player editPlayerData(HttpServletRequest request, String playerData);
	Player updatePlayerData(String playerData);
	String deleteById(Integer pId);
	
}
