import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { TbReportSearch } from "react-icons/tb";
import Navbar from "react-bootstrap/Navbar";
import { redirect, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const today = new Date();

  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <Navbar style={{ borderBottom: "4px solid #16423C" }}>
        <Container style={{ height: "75px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Navbar.Brand
              onClick={() => navigate("/dashboard")}
              style={{
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              <img
                alt=""
                src="/logo_name.png"
                width="120px"
                height="40px"
                className="d-inline-block align-top"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />{" "}
            </Navbar.Brand>
            <p
              style={{
                color: "#16423C",
                marginTop: "16px",
                marginLeft: "12px",
                fontWeight: "600",
                fontFamily: "poppins",
                fontSize: "14px",
              }}
            >
              {formattedDate}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Report Button */}
          <Nav.Link
            onClick={() => navigate("/report")}
            className="shadow"
            style={{
              fontFamily: "Poppins",
              backgroundColor: "#E9EFEC",
              padding: "4px 12px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              height: "30px"
            }}
          >
            <TbReportSearch />
            <span>Report</span>
          </Nav.Link>

          {/* Profile Section */}
          <div className="shadow" style={{
            backgroundColor: "rgb(228, 236, 231)",
            height: "45px",
            borderRadius: "2em",
            border: "2px solid #E9EFEC",
            display: "flex",
            alignItems: "center",
            padding: "0 8px"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={localStorage.getItem("image")}
                alt="pfp"
                className="rounded-5"
                style={{
                  width: "35px",
                  height: "35px",
                  border: "2px solid #16423C",
                }}
              />
              <p style={{
                marginLeft: "12px",
                marginTop: '14px',
                marginRight: '8px',
                fontSize: "16px",
                fontFamily: "Poppins",
              }}>
                {localStorage.getItem("profile_name")}
              </p>
            </div>
          </div>
        </div>
        </Container>
      </Navbar>
    </div>
  );
}
