package com.mpl.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "players_test")
@JsonIgnoreProperties
public class Player {
	
	@Id
	@GeneratedValue
	private Integer pId;
	private String pName;
	private String pEmail;
	private String pDob;
	private String pImage;
	private String pRole;
	private String pBatting;
	private String pBowling;
	private String pKit;
	private String pPayment;
	
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
	public String getpEmail() {
		return pEmail;
	}
	public void setpEmail(String pEmail) {
		this.pEmail = pEmail;
	}
	public String getpDob() {
		return pDob;
	}
	public void setpDob(String pDob) {
		this.pDob = pDob;
	}
	public String getpImage() {
		return pImage;
	}
	public void setpImage(String pImage) {
		this.pImage = pImage;
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
	public String getpKit() {
		return pKit;
	}
	public void setpKit(String pKit) {
		this.pKit = pKit;
	}
	public String getpPayment() {
		return pPayment;
	}
	public void setpPayment(String pPayment) {
		this.pPayment = pPayment;
	}
	
	@Override
	public String toString() {
		return "Player [pId=" + pId + ", pName=" + pName + ", pEmail=" + pEmail + ", pDob=" + pDob + ", pImage="
				+ pImage + ", pRole=" + pRole + ", pBatting=" + pBatting + ", pBowling=" + pBowling + ", pKit=" + pKit
				+ ", pPayment=" + pPayment + "]";
	}
}
