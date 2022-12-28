package com.mpl.entities;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Component
@Document(collection = "mpl_2023_team")
@JsonIgnoreProperties
public class Team {
	
	@Id
	private Integer pId;
	private String pName;
	private String pRole;
	private String pBatting;
	private String pBowling;
	private Integer pBasePrice;
	private Integer pSoldPrice;
	private String pTeam;
	private String pStatus;
	
	public Integer getpId() {
		return pId;
	}
	public void setpId(Integer pId) {
		this.pId = pId;
	}
	public String getpName() {
		return pName;
	}
	public void setpName(String pName) {
		this.pName = pName;
	}
	public String getpRole() {
		return pRole;
	}
	public void setpRole(String pRole) {
		this.pRole = pRole;
	}
	public String getpBatting() {
		return pBatting;
	}
	public void setpBatting(String pBatting) {
		this.pBatting = pBatting;
	}
	public String getpBowling() {
		return pBowling;
	}
	public void setpBowling(String pBowling) {
		this.pBowling = pBowling;
	}
	public Integer getpBasePrice() {
		return pBasePrice;
	}
	public void setpBasePrice(Integer pBasePrice) {
		this.pBasePrice = pBasePrice;
	}
	public Integer getpSoldPrice() {
		return pSoldPrice;
	}
	public void setpSoldPrice(Integer pSoldPrice) {
		this.pSoldPrice = pSoldPrice;
	}
	public String getpTeam() {
		return pTeam;
	}
	public void setpTeam(String pTeam) {
		this.pTeam = pTeam;
	}
	public String getpStatus() {
		return pStatus;
	}
	public void setpStatus(String pStatus) {
		this.pStatus = pStatus;
	}
	
	@Override
	public String toString() {
		return "Team [pId=" + pId + ", pName=" + pName + ", pBasePrice=" + pBasePrice + ", pSoldPrice=" + pSoldPrice
				+ ", pTeam=" + pTeam + ", pStatus=" + pStatus + "]";
	}

}
