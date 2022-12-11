package com.mpl.payloads;

import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PaytmDto {

	private String merchantId;
	private String merchantKey;
	private String channelId;
	private String website;
	private String industryTypeId;
	private String paytmUrl;
	private Map<String, String> details;
	
}
