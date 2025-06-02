import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
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
          <div
            className="shadow"
            style={{
              backgroundColor: "rgb(228, 236, 231)",
              width: "175px",
              height: "45px",
              borderRadius: "2em",
              border: "2px solid #E9EFEC",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "4px",
                width: "35px",
                height: "35px",
              }}
            >
              <img
                src="sulthan.jpg"
                alt=""
                className="rounded-5"
                style={{
                  width: "100px",
                  height: "35px",
                  border: "2px solid #16423C",
                }}
              />
              <p
                style={{
                  marginTop: "4px",
                  marginLeft: "12px",
                  fontSize: "16px",
                  fontFamily: "poppins",
                }}
              >
                {localStorage.getItem("profile_name")}
              </p>
              <div>
                <p></p>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
