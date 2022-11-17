package com.mpl.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mpl.bean.Player;


public interface PlayerRepository extends JpaRepository<Player, Integer>{

}
