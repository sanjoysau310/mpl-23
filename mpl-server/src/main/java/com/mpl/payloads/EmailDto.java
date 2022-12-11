package com.mpl.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class EmailDto {
	
	private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}
