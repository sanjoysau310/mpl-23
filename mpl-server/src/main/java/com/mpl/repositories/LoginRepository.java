package com.mpl.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.mpl.entities.Login;
import com.mpl.entities.Player;


@Repository
public interface LoginRepository extends MongoRepository<Login, String>{
	
	@Query("{email :?0}")
    Login getLoginDetailsByEmail(String  email);
	
	Optional<Login> findByEmail(String email);

}
