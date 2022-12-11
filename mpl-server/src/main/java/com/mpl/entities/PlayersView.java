package com.mpl.entities;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Component
@Document(collection = "players_test")
@Data
@JsonIgnoreProperties
public class PlayersView {
	
	@Id
	private Integer pId;
	private String pName;
	//private String pTeam;
	//private String pStatus;
	private String pPaymentMode;
	private String pPaymentStatus;
	
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
	public String getpPaymentMode() {
		return pPaymentMode;
	}
	public void setpPaymentMode(String pPaymentMode) {
		this.pPaymentMode = pPaymentMode;
	}
	public String getpPaymentStatus() {
		return pPaymentStatus;
	}
	public void setpPaymentStatus(String pPaymentStatus) {
		this.pPaymentStatus = pPaymentStatus;
	}
	@Override
	public String toString() {
		return "PlayersViewBean [pId=" + pId + ", pName=" + pName + ", pPaymentMode=" + pPaymentMode
				+ ", pPaymentStatus=" + pPaymentStatus + "]";
	}
}
