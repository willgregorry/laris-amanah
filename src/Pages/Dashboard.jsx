import React, { useState } from "react";
import Header from "./../Components/Header";
import TableInfo from "./TableInfo";
import TransactionForm from "../Components/TransactionForm";
import data from "./../data.json"; // Import the data here

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    const nameMatch = item.nama_barang
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const kodeMatch = item.kode_barang
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const satuanMatch = item.satuan
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const priceAsNumber = Number(searchTerm.replace(/[^0-9]/g, ""));
    const priceMatch =
      !isNaN(priceAsNumber) && item.harga_satuan === priceAsNumber;

    return nameMatch || priceMatch || kodeMatch || satuanMatch;
  });

  return (
    <div
      className="m-4 rounded-4"
      style={{ height: "93.3vh", width: "", backgroundColor: "#C4DAD2" }}
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "70%",
        }}
      >
        <div
          style={{
            marginLeft: "2em",
            marginRight: "2em",
            width: "65%",
          }}
        >
          <input
            type="text"
            placeholder="Cari ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              fontFamily: "Poppins",
              borderRadius: "8px",
              height: "30px",
              marginBottom: "16px",
              padding: "8px",
              width: "100%",
            }}
          />
          <TableInfo data={filteredData} />
        </div>
        <div
        className="rounded-5"
          style={{
            backgroundColor: "white",
            width: "28%",
            border: '1px solid #16423C',
          }}
        >
          <TransactionForm />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
