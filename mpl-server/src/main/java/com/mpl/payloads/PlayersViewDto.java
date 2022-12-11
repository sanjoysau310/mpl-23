package com.mpl.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PlayersViewDto {

	private Integer pId;
	private String pName;
	private String pTeam;
	private String pStatus;
	private String pPaymentMode;
	private String pPaymentStatus;
}
