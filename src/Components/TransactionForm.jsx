import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Container, Form, Button } from "react-bootstrap";

export default function TransactionForm() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    product_code: "",
    product_name: "",
    cust_name: "",
    price: "",
  });

  // Timestamp
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Submit transaction details
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/login/`;

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      console.log("Success:", result);
    } catch (err) {
      console.error("Submission error:", err);

      if (err.response && err.response.data) {
        setErrorMsg("Transaksi Gagal!");
        setShowAlert(true);
      } else {
        setErrorMsg("Terjadi kesalahan saat mengirim data.");
        setShowAlert(true);
      }
    }
  };

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p
          style={{
            color: "black",
            fontSize: "14px",
            textAlign: "center",
            marginTop: "8px",
            marginBottom: "0px",
          }}
        >
          Transaction Receipt <br />
          {time}
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label
              style={{
                fontSize: "12px",
                marginBottom: "-1em",
                marginLeft: "12px",
                color: "gray",
              }}
            >
              Nama Pelanggan
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama pelanggan"
              name="cust_name"
              value={formData.cust_name}
              onChange={handleChange}
              className="rounded-5"
              style={{
                fontSize: "14px",
                backgroundColor: "whitesmoke",
                width: "100%",
                height: "2em",
              }}
            />
          </Form.Group>

          <p
            style={{
              fontSize: "12px",
              marginBottom: "0px",
              marginLeft: "12px",
              color: "gray",
            }}
          >
            Order Lists
          </p>
          <div
            className="rounded-4"
            style={{
              backgroundColor: "whitesmoke",
              border: "1px solid #C4DAD2",
              width: "100%",
              height: "180px",
            }}
          ></div>

          <p
            style={{
              fontSize: "12px",
              marginTop: "8px",
              marginBottom: "1px",
              marginLeft: "12px",
              color: "gray",
            }}
          >
            Payment Details
          </p>
          <div
            className="rounded-4"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: 'space-between',
              backgroundColor: "whitesmoke",
              border: "1px solid #C4DAD2",
              width: "100%",
              height: "50px",
            }}
          >
            <p
              style={{
                marginTop: "14px",
                marginLeft: "4px",
                fontSize: "12px",
              }}
            >
              Total Harga
            </p>
            <p
              style={{
                marginTop: "14px",
                marginLeft: "4px",
                marginRight: '4px',
                fontSize: "12px",
              }}
            >
              {"Rp " + "50.000" + ",00"}
            </p>
          </div>

          <Button
            type="submit"
            className="rounded-5"
            style={{
              width: "100%",
              backgroundColor: "#16423C",
              color: "white",
              border: "none",
              marginTop: "10px",
            }}
          >
            Transaksi
          </Button>
        </Form>
      </div>
    </Container>
  );
}
