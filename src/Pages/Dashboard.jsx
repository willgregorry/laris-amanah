import React, { useState } from "react";
import Header from "./../Components/Header";
import TableInfo from "./TableInfo";
import data from "./../data.json"; // Import the data here

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="m-4 rounded-4"
      style={{ height: "93vh", width: "", backgroundColor: "#C4DAD2" }}
    >
      <Header />
      <h5
        style={{
          color: "#16423C",
          fontFamily: "Poppins",
          fontWeight: "bold",
          margin: "16px",
          marginLeft: "34px",
        }}
      >
        Selamat datang kembali, {localStorage.getItem("profile_name")}!
      </h5>

      <input
        type="text"
        placeholder="Cari nama barang..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          fontFamily: 'Poppins',
          borderRadius: '8px',
          height: '30px',
          marginBottom: "16px",
          padding: "8px",
          width: "1115px",
          marginLeft: "34px",
        }}
      />

      <div
        style={{
          marginLeft: "2em",
          marginRight: "2em",
          width: "75%",
          height: "75%",
        }}
      >
        <TableInfo data={filteredData} />
      </div>
    </div>
  );
}

export default Dashboard;