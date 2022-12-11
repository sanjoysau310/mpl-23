package com.mpl.payloads;

import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PaymentDto {

	private String orderId;
	private Integer pId;
	private Map<String, String> details;
}
