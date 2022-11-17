import axios from "axios";
import React, { useState } from "react";
import PaymentDetails from "./PaymentDetails";

export default function MakePayment() {
  const [res, setRES] = useState("");
  const makePayment = async () => {
    const paymentData = new FormData();
    paymentData.append("CUST_ID", "123");
    paymentData.append("TXN_AMOUNT", "11");
    paymentData.append("ORDER_ID", "12ab");
    const result = await axios.post(
      "http://localhost:8080/makepayment",
      paymentData
    );
    console.log(result.data);
    setRES(result.data);
  };
  console.log(res);
  return (
    <div>
      <button className="btn btn-primary mt-100" onClick={makePayment}>
        Pay Now
      </button>
      {res}
      {res !== null ? <PaymentDetails /> : <h3>Payment failed</h3>}
    </div>
  );
}
