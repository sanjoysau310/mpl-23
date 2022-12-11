package com.mpl.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.mpl.entities.Player;
import com.mpl.entities.PlayersView;


@Repository
public interface PlayersViewRepository extends MongoRepository<PlayersView, Integer>{

}
