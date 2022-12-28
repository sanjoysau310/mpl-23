package com.mpl.entities;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Component
@Document(collection = "mpl_2023_players_sequence")
@Data
@JsonIgnoreProperties
public class PlayerSequence {

	@Id
	private String id;

	private Integer seq;
}
