package com.mpl.services.payment;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import java.util.Map.Entry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.mpl.entities.Payment;
import com.mpl.entities.Paytm;
import com.mpl.entities.Player;
import com.mpl.repositories.PaymentRepository;
import com.mpl.repositories.PlayerRepository;
import com.paytm.pg.merchant.PaytmChecksum;


@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private Paytm paytmBean;

	@Autowired
	private Payment paymentBean;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private MongoOperations mongoOperations;

	public Payment getPaymentAfterUpdate(Map<String, String> details) {

		String orderId = details.get("ORDERID");
		Query query = new Query(Criteria.where("orderId").is(orderId));
		@SuppressWarnings("static-access")
		Update update = new Update().update("details", details);
		Payment paymentData = mongoOperations.findAndModify(query, update, options().returnNew(true).upsert(true),
				Payment.class);
		return paymentData;
	}

	@Override
	public TreeMap<String, String> getPaytmDetails(Integer id) throws Exception {

		Player player = playerRepository.getPlayerById(id);
		String orderId = UUID.randomUUID().toString();
		TreeMap<String, String> parameters = new TreeMap<>();
		paytmBean.getDetails().forEach((k, v) -> parameters.put(k, v));
		parameters.put("MOBILE_NO", "+91"+player.getpPhone());
		parameters.put("EMAIL", player.getpEmail());
		parameters.put("ORDER_ID", orderId);
		parameters.put("CUST_ID", "CUSTID_" + player.getpId());
		parameters.put("TXN_AMOUNT", player.getpFees().toString());
		parameters.put("CHECKSUMHASH", getCheckSum(parameters));
		// save orderid and pid to txn table
		paymentBean.setOrderId(orderId);
		paymentBean.setpId(id);
		paymentRepository.save(paymentBean);
		return parameters;
	}

	@Override
	public Payment getPaymentResponse(HttpServletRequest request) {

		Map<String, String[]> mapData = request.getParameterMap();
		TreeMap<String, String> parameters = new TreeMap<String, String>();
		String paytmChecksum = "";
		for (Entry<String, String[]> requestParamsEntry : mapData.entrySet()) {
			if ("CHECKSUMHASH".equalsIgnoreCase(requestParamsEntry.getKey())) {
				paytmChecksum = requestParamsEntry.getValue()[0];
			} else {
				parameters.put(requestParamsEntry.getKey(), requestParamsEntry.getValue()[0]);
			}
		}
		String result;
		boolean isValideChecksum = false;
		try {
			isValideChecksum = validateCheckSum(parameters, paytmChecksum);
			if (isValideChecksum && parameters.containsKey("RESPCODE")) {
				if (parameters.get("RESPCODE").equals("01")) {
					result = "Payment Successful";
				} else {
					result = "Payment Failed";
				}
			} else {
				//Checksum mismatched
				result = "Payment Unsuccessful";
			}
		} catch (Exception e) {
			result = e.toString();
		}
		parameters.put("result", result);
		parameters.remove("CHECKSUMHASH");
		// save txn details
		Payment paymentData = getPaymentAfterUpdate(parameters);
	
		return paymentData;
	}

	@Override
	public boolean validateCheckSum(TreeMap<String, String> parameters, String paytmChecksum) throws Exception {
		return PaytmChecksum.verifySignature(parameters, paytmBean.getMerchantKey(), paytmChecksum);
	}

	@Override
	public String getCheckSum(TreeMap<String, String> parameters) throws Exception {
		return PaytmChecksum.generateSignature(parameters, paytmBean.getMerchantKey());
	}

}
