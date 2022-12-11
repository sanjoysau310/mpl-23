package com.mpl.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PlayerDto {
	
	public static final String SEQUENCE_NAME = "players_sequence";	
	private Integer pId;
	private String pName;
	private String pEmail;
	private String pPhone;
	private String pWhatsapp;
	private String pDob;
	private String pImage;
	private String pRole;
	private String pBatting;
	private String pBowling;
	private String pKit;
	private Integer pFees;
	private Integer pBasePrice;
	private Integer pSoldPrice;
	private String pTeam;
	private String pStatus;
	private String pPaymentMode;
	private String pPaymentStatus;
}
