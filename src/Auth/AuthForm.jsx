import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { redirect, useNavigate, useNavigation } from "react-router-dom";

function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/login/`;

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      console.log("Success:", result);

      localStorage.setItem("authToken", result.token);
      localStorage.setItem("profile_name", result.name);

      if (result.name === "Sulthan") {
        localStorage.setItem("image", "sulthan.jpg");
      }
      if (result.name === "Fayyaz") {
        localStorage.setItem("image", "fayyaz.jpg");
      }

      navigate("/dashboard");
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
        background: "linear-gradient(45deg, #16423C, #6A9C89)",
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
        <img src="logo.png" alt="logo" width={50} style={{marginBottom: '12px'}}/>
        <h3 style={{ marginBottom: "12px", color: colors.text }}>Login</h3>
        <p style={{ color: "gray", fontSize: "14px" }}>
          Gunakan email dan kata sandi Anda untuk mengakses akun!
        </p>

        {showAlert && (
          <Alert
            style={{ height: "75px" }}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(false)}
          >
            <Alert.Heading style={{ fontSize: "16px" }}>Error!</Alert.Heading>
            <p style={{ fontSize: "12px" }}>{errorMsg}</p>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Masukkan email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ position: "relative" }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "73%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#16423C",
                userSelect: "none",
              }}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
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
