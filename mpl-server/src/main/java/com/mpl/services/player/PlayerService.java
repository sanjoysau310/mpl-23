package com.mpl.services.player;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mpl.payloads.PlayerDto;
import com.mpl.payloads.PlayersViewDto;


@Service
public interface PlayerService {
	PlayerDto registerPlayer(HttpServletRequest request, String player, MultipartFile file);
	List<PlayerDto> getAllPlayers();
	List<PlayersViewDto> getPlayersView();
	PlayerDto getPlayerByEmail(String pEmail);
	PlayerDto getPlayerById(Integer pId);
	PlayerDto updatePlayerPaymentStatus(HttpServletRequest request,Integer pId, String paymentResult);
	boolean checkEmailExists(String pEmail);
	boolean checkPhoneExists(String pPhone);
	PlayerDto editPlayerData(HttpServletRequest request, String playerData);
	PlayerDto updatePlayerData(String playerData);
	String deleteById(Integer pId);
	
}
