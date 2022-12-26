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

	@PutMapping("/updateplayerdata")
	Team addPlayerTeam(@RequestBody String playerData) {
		System.out.println("update data::::::::::---------------" + playerData);
		teamService.updatePlayerTeam(playerData);
		return null;
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
		List<String> teamslist = teamService.getTeams();
		return null;
	}
	
	@GetMapping("/teamscaptains")
	List<Team> getTeamsCaptains() {
		List<Team> teamsCaptains = teamService.getTeamsCaptains();
		System.out.println("teammmmmm-------------" + teamsCaptains.toString());
		return teamsCaptains;
	}

	@GetMapping("/teamsplayers")
	List<Team> getTeamsPlayers() {
		List<Team> teamsPlayers = teamService.getTeamsPlayers();
		System.out.println("teammmmmm-------------" + teamsPlayers.toString());
		return teamsPlayers;
	}
}
