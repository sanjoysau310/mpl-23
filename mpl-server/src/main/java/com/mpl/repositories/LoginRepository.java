package com.mpl.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.mpl.entities.Login;
import com.mpl.entities.Player;


@Repository
public interface LoginRepository extends MongoRepository<Login, String>{
	
	Optional<Login> findByUsername(String username);

	@Query(value="{username :?0}", delete = true)
	void deleteBypEmail(String username);

}
