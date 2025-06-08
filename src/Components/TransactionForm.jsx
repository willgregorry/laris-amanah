import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Container, Form, Button, Modal } from "react-bootstrap";

export default function TransactionForm({ orders, setOrders, refreshData }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [formData, setFormData] = useState({
    customer: "",
  });

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

    if (orders.length === 0) {
      setModalContent("Belum ada produk yang dipilih.");
      handleShow();
      return;
    }

    const timestamp = new Date().toISOString();

    const payload = orders.map((item) => ({
      customer: formData.customer,
      produk: item.kode_barang,
      jumlah: String(item.qty),
      waktu_transaksi: timestamp,
    }));

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/transaksi/`;

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Transaksi berhasil:", response.data);

      setModalContent(
        <>
          <p>
            Transaksi berhasil untuk <strong>{formData.customer}</strong>
          </p>
          <ul>
            {orders.map((item) => (
              <li key={item.kode_barang}>
                {item.qty}x {item.nama_barang}
              </li>
            ))}
          </ul>
        </>
      );
      handleShow();
      setFormData({ customer: "" });
      setOrders([]);
      refreshData();

    } catch (err) {
      console.error("Submission error:", err);
      setModalContent("Lengkapi seluruh field yang masih kosong!");
      handleShow();
    }
  };

  const total = orders.reduce(
    (sum, item) => sum + item.harga_satuan * item.qty,
    0
  );

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
              name="customer"
              value={formData.customer}
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
              overflowY: "auto",
            }}
          >
            {orders.map((item) => (
              <div
                key={item.kode_barang}
                style={{ fontSize: "12px", marginBottom: "4px", margin: "8px" }}
              >
                {item.qty}x {item.nama_barang} ({item.satuan}) - Rp{" "}
                {item.harga_satuan.toLocaleString("id-ID")}
              </div>
            ))}
            {orders.length === 0 && (
              <p
                style={{
                  fontSize: "12px",
                  marginBottom: "4px",
                  margin: "8px",
                  color: "gray",
                }}
              >
                Belum ada item.
              </p>
            )}
          </div>

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
              justifyContent: "space-between",
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
                marginRight: "4px",
                fontSize: "12px",
              }}
            >
              <span>Rp {total.toLocaleString("id-ID")},00</span>
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
              marginTop: "20px",
            }}
          >
            Transaksi
          </Button>
        </Form>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Status Transaksi</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}
