import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { redirect, useNavigate, useNavigation } from "react-router-dom";

function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email_pengguna: "",
    kata_sandi: "",
  });

  const colors = {
    background: "#16423C",
    box: "#E9EFEC",
    button: "#16423C",
    text: "#333",
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setShowAlert(false);

    const endpoint = "https://bbxlsmbl-8000.asse.devtunnels.ms/user/login/";

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      console.log("Success:", result);

      localStorage.setItem("authToken", result.token);

      navigate("/mainbackground");
    } catch (err) {
      console.error("Submission error:", err);

      if (err.response && err.response.data) {
        setErrorMsg("Account not found!");
        setShowAlert(true);
      } else {
        setErrorMsg("Terjadi kesalahan saat mengirim data.");
        setShowAlert(true);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        style={{
          maxWidth: "400px",
          backgroundColor: colors.box,
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h3 style={{ marginBottom: "12px", color: colors.text }}>Login</h3>
        <p style={{ color: "gray", fontSize: "14px" }}>
          Gunakan email dan kata sandi Anda untuk mengakses akun!
        </p>

        {showAlert && (
          <Alert
            style={{height: "75px"}}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(false)}
          >
            <Alert.Heading style={{fontSize: "16px"}}>Error!</Alert.Heading>
            <p style={{fontSize: "12px"}}>{errorMsg}</p>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Masukkan email"
              name="email_pengguna"
              value={formData.email_pengguna}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan password"
              name="kata_sandi"
              value={formData.kata_sandi}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: colors.button,
              border: "none",
              marginTop: "10px",
            }}
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AuthForm;
