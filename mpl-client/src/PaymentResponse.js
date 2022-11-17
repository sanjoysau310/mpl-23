import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PaymentResponse() {
  const [res, setRES] = useState("");
  useEffect(() => {
    getResponse();
  }, []);

  const getResponse = async () => {
    const result = await axios.get("http://localhost:8080/pgresponse");
    console.log(result.data);
    setRES(result.data);
  };
  return (
    <div>
      PaymentResponse
      {res}
    </div>
  );
}
