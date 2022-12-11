package com.mpl.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.mpl.entities.Payment;

public interface PaymentRepository extends MongoRepository<Payment,String>{
	
	@Query("{txnId :?0}")
    Payment getTxnById(String txnId);
}
