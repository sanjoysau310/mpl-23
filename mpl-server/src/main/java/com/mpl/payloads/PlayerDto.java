package com.mpl.payloads;


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
	public static String getSequenceName() {
		return SEQUENCE_NAME;
	}
	@Override
	public String toString() {
		return "PlayerDto [pId=" + pId + ", pName=" + pName + ", pEmail=" + pEmail + ", pPhone=" + pPhone
				+ ", pWhatsapp=" + pWhatsapp + ", pDob=" + pDob + ", pImage=" + pImage + ", pRole=" + pRole
				+ ", pBatting=" + pBatting + ", pBowling=" + pBowling + ", pKit=" + pKit + ", pFees=" + pFees
				+ ", pBasePrice=" + pBasePrice + ", pSoldPrice=" + pSoldPrice + ", pTeam=" + pTeam + ", pStatus="
				+ pStatus + ", pPaymentMode=" + pPaymentMode + ", pPaymentStatus=" + pPaymentStatus + ", getpId()="
				+ getpId() + ", getpName()=" + getpName() + ", getpEmail()=" + getpEmail() + ", getpPhone()="
				+ getpPhone() + ", getpWhatsapp()=" + getpWhatsapp() + ", getpDob()=" + getpDob() + ", getpImage()="
				+ getpImage() + ", getpRole()=" + getpRole() + ", getpBatting()=" + getpBatting() + ", getpBowling()="
				+ getpBowling() + ", getpKit()=" + getpKit() + ", getpFees()=" + getpFees() + ", getpBasePrice()="
				+ getpBasePrice() + ", getpSoldPrice()=" + getpSoldPrice() + ", getpTeam()=" + getpTeam()
				+ ", getpStatus()=" + getpStatus() + ", getpPaymentMode()=" + getpPaymentMode()
				+ ", getpPaymentStatus()=" + getpPaymentStatus() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	
}
