package com.mpl.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.mpl.entities.Player;


@Repository
public interface PlayerRepository extends MongoRepository<Player, Integer>{
	
	@Query("{pId :?0}")
    Player getPlayerById(Integer pId);
	
	@Query("{pEmail :?0}")
	Player findByEmail(String pEmail);

	@Query(value="{pId :?0}", delete = true)
	void deleteBypId(Integer pId);

}
