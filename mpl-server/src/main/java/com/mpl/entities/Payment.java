package com.mpl.entities;

import java.util.Map;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;


@Component
@JsonIgnoreProperties
@Document(collection = "mpl_2023_trxn")
@Data
public class Payment {

	@Id
	private String orderId;
	private Integer pId;
	private Map<String, String> details;

	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public Integer getpId() {
		return pId;
	}
	public void setpId(Integer pId) {
		this.pId = pId;
	}
	public Map<String, String> getDetails() {
		return details;
	}
	public void setDetails(Map<String, String> details) {
		this.details = details;
	}
	@Override
	public String toString() {
		return "PaymentBean [orderId=" + orderId + ", pId=" + pId + ", details=" + details + "]";
	}
}
