package com.mpl.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.mpl.entities.Team;

@Repository
public interface TeamsRepository extends MongoRepository<Team, Integer>{
	
	@Query("{pStatus :?0}")
	List<Team> findByPStatus(String pStatus);

	@Query("{pRole :?0}")
	List<Team> findByRole(String pRole);

}
