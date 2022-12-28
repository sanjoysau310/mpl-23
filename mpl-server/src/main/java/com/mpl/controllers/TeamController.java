package com.mpl.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mpl.entities.Player;
import com.mpl.entities.Team;
import com.mpl.services.team.TeamService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/team")
public class TeamController {

	@Autowired
	private TeamService teamService;

	@PutMapping("/addplayerdata")
	Team addPlayerTeam(@RequestBody String playerData) {
		return teamService.updatePlayerTeam(playerData);
	}
	
	@PutMapping("/updateplayerdata")
	Team updatePlayerTeam(@RequestBody String playerData) {
		return teamService.updatePlayerTeam(playerData);
	}
	
	@GetMapping("/soldplayers")
	List<Team> getSoldPlayers(){
		List<Team> soldPlayers=teamService.getSoldPlayers();
		return soldPlayers;
	}
	
	@GetMapping("/unsoldplayers")
	List<Team> getUnSoldPlayers(){
		List<Team> unSoldPlayers=teamService.getUnSoldPlayers();
		return unSoldPlayers;
	}

	@GetMapping("/teamslist")
	List<String> getTeams() {
		return teamService.getTeams();
	}
	
	@GetMapping("/teamscaptains")
	List<Team> getTeamsCaptains() {
		return teamService.getTeamsCaptains();
	}

	@GetMapping("/teamsplayers")
	List<Team> getTeamsPlayers() {
		return teamService.getTeamsPlayers();
	}
}
