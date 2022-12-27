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
import com.mpl.repositories.TeamsRepository;

@Service
public class TeamServiceImpl implements TeamService {
	
	@Autowired
	private TeamsRepository teamsRepository;
	
	@Autowired
	private MongoOperations mongoOperations;
	
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public void addToTeams(Player player) {
		
		Team team=new Team();
		team.setpId(player.getpId());
		team.setpName(player.getpName());
		team.setpBasePrice(player.getpBasePrice());
		team.setpSoldPrice(player.getpSoldPrice());
		team.setpTeam(player.getpTeam());
		team.setpStatus(player.getpStatus());
		
		teamsRepository.save(team);
	}
	@Override
	public void updatePlayerTeam(String playerData) {
		Team team = null;
		try {
			team=objectMapper.readValue(playerData, Team.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		Query query = new Query(Criteria.where("pId").is(team.getpId()));
		Update update = new Update();
		update.set("pTeam", team.getpTeam());
		update.set("pSoldPrice", team.getpSoldPrice());
		update.set("pStatus", team.getpStatus());
		Team updatedTeam = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Team.class);
		
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
		List<Team> teamCapatains=teamsRepository.findByRole("CAPTAIN");
		return teamCapatains;
	}
}
