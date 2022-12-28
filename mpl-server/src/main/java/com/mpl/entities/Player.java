package com.mpl.entities;

import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Component
@Document(collection = "mpl_2023_players")
@Data
@JsonIgnoreProperties
public class Player {
	
	@Transient
	public static final String SEQUENCE_NAME = "mpl_2023_players_seq";

	@Id
	private Integer pId;
	private String pName;
	@Indexed(unique = true)
	private String pEmail;
	private String pPassword;
	private String pConfirmPassword;
	@Indexed(unique = true)
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
	
	public String getSequenceName() {
		return SEQUENCE_NAME;
	}
	
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
	public String getpPassword() {
		return pPassword;
	}
	public void setpPassword(String pPassword) {
		this.pPassword = pPassword;
	}
	public String getpConfirmPassword() {
		return pConfirmPassword;
	}
	public void setpConfirmPassword(String pConfirmPassword) {
		this.pConfirmPassword = pConfirmPassword;
	}
	public String getpPhone() {
		return pPhone;
	}
	public void setpPhone(String pPhone) {
		this.pPhone = pPhone;
	}
	public String getpWhatsapp() {
		return pWhatsapp;
	}
	public void setpWhatsapp(String pWhatsapp) {
		this.pWhatsapp = pWhatsapp;
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
	public Integer getpFees() {
		return pFees;
	}
	public void setpFees(Integer pFees) {
		this.pFees = pFees;
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
		return "Player [pId=" + pId + ", pName=" + pName + ", pEmail=" + pEmail + ", pPassword=" + pPassword
				+ ", pConfirmPassword=" + pConfirmPassword + ", pPhone=" + pPhone + ", pWhatsapp=" + pWhatsapp
				+ ", pDob=" + pDob + ", pImage=" + pImage + ", pRole=" + pRole + ", pBatting=" + pBatting
				+ ", pBowling=" + pBowling + ", pKit=" + pKit + ", pFees=" + pFees + ", pBasePrice=" + pBasePrice
				+ ", pSoldPrice=" + pSoldPrice + ", pTeam=" + pTeam + ", pStatus=" + pStatus + ", pPaymentMode="
				+ pPaymentMode + ", pPaymentStatus=" + pPaymentStatus + "]";
	}
	
}
