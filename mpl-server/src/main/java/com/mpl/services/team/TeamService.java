package com.mpl.services.team;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mpl.entities.Player;
import com.mpl.entities.Team;

@Service
public interface TeamService {

	Team addToTeams(Player player);
	Team updatePlayerTeam(String playerData);
	List<Team> getSoldPlayers();
	List<Team> getUnSoldPlayers();
	List<String> getTeams();
	List<Team> getTeamsPlayers();
	List<Team> getTeamsCaptains();
	void editPlayerTeam(String playerData);
	
}
