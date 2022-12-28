package com.mpl.services.team;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mpl.entities.Player;
import com.mpl.entities.Team;
import com.mpl.payloads.PlayerDto;
import com.mpl.repositories.TeamsRepository;
import com.mpl.services.player.PlayerService;

@Service
public class TeamServiceImpl implements TeamService {
	
	@Autowired
	private TeamsRepository teamsRepository;
	
	@Autowired
	private MongoOperations mongoOperations;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private PlayerService playerService;

	@Override
	public Team addToTeams(Player player) {
		
		Team team=new Team();
		team.setpId(player.getpId());
		team.setpName(player.getpName());
		team.setpBasePrice(player.getpBasePrice());
		team.setpSoldPrice(player.getpSoldPrice());
		team.setpTeam(player.getpTeam());
		team.setpStatus(player.getpStatus());
		
		Team addedTeam=teamsRepository.save(team);
		return addedTeam;
	}
	
	@Override
	public void editPlayerTeam(String playerData) {
		Team team = null;
		try {
			team=objectMapper.readValue(playerData, Team.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		//retive player details
		PlayerDto player=playerService.getPlayerById(team.getpId());
		//edit team table
		Query query = new Query(Criteria.where("pId").is(team.getpId()));
		Update update = new Update();
		update.set("pName", player.getpName());
		update.set("pRole", player.getpRole());
		update.set("pBasePrice", team.getpBasePrice());
		update.set("pTeam", team.getpTeam());
		update.set("pSoldPrice", team.getpSoldPrice());
		update.set("pStatus", team.getpStatus());
		Team editedTeam = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Team.class);
		
		//teamsRepository.save(team);
	}
	
	@Override
	public Team updatePlayerTeam(String playerData) {
		Team team = null;
		try {
			team=objectMapper.readValue(playerData, Team.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		Query query = new Query(Criteria.where("pId").is(team.getpId()));
		Update update = new Update();
		update.set("pName", team.getpName());
		update.set("pRole", team.getpRole());
		update.set("pBasePrice", team.getpBasePrice());
		update.set("pTeam", team.getpTeam());
		update.set("pSoldPrice", team.getpSoldPrice());
		update.set("pStatus", team.getpStatus());
		Team updatedTeam = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Team.class);
		return updatedTeam;
		//teamsRepository.save(team);
	}
	
	@Override
	public List<Team> getSoldPlayers() {
		return teamsRepository.findByPStatus("SOLD");
	}
	@Override
	public List<Team> getUnSoldPlayers() {
		return teamsRepository.findByPStatus("UNSOLD");
	}
	
	@Override
	public List<String> getTeams() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<Team> getTeamsPlayers() {
		return teamsRepository.findAll();
	}
	@Override
	public List<Team> getTeamsCaptains() {
		return teamsRepository.findByPStatus("CAPTAIN");
	}
}
