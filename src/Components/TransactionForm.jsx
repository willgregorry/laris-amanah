import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Container } from "react-bootstrap";

export default function TransactionForm() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://api.example.com/data")
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <Container>
      <div>
        <p
          style={{
            color: "gray",
            fontSize: "14px",
            textAlign: "center",
            marginTop: "8px",
          }}
        >
          Transaction Receipt <br />
          {time}
        </p>
      </div>
    </Container>
  );
}
