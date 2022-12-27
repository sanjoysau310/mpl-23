package com.mpl.payloads;

public class PlayersViewDto {

	private Integer pId;
	private String pName;
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
}
