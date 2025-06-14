import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./../Components/Header";
import TableInfo from "./TableInfo";
import TransactionForm from "../Components/TransactionForm";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataBarang, setDataBarang] = useState([]);
  const [orders, setOrders] = useState([]);

  const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/produk/`;

  const fetchDataBarang = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/produk/`)
      .then((res) => {
        const processed = res.data.map((item) => ({
          ...item,
          harga_satuan: Number(item.harga_satuan),
        }));
        setDataBarang(processed);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
      });
  };

  useEffect(() => {
    fetchDataBarang();
  }, []);

  const filteredData = dataBarang.filter((item) => {
    const nameMatch = item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase());
    const kodeMatch = item.kode_barang.toLowerCase().includes(searchTerm.toLowerCase());
    const satuanMatch = item.satuan.toLowerCase().includes(searchTerm.toLowerCase());

    const priceAsNumber = Number(searchTerm.replace(/[^0-9]/g, ""));
    const priceMatch = !isNaN(priceAsNumber) && item.harga_satuan === priceAsNumber;

    return nameMatch || kodeMatch || satuanMatch || priceMatch;
  });

  const handleAddItem = (item) => {
    setOrders((prevOrders) => {
      const existingItem = prevOrders.find((i) => i.kode_barang === item.kode_barang);
      if (existingItem) {
        return prevOrders.map((i) =>
          i.kode_barang === item.kode_barang ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prevOrders, { ...item, qty: 1 }];
      }
    });
  };

  const handleRemoveItem = (kode_barang) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((i) =>
          i.kode_barang === kode_barang ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  return (
    <div
      className="m-4 rounded-4"
      style={{ height: "93.3vh", backgroundColor: "#C4DAD2" }}
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
        Selamat datang, {localStorage.getItem("profile_name")}!
      </h5>

      <div style={{ display: "flex", flexDirection: "row", height: "70%" }}>
        <div style={{ marginLeft: "2em", marginRight: "2em", width: "65%" }}>
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
          <TableInfo
            data={filteredData}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
        </div>
        <div
          className="rounded-5"
          style={{
            backgroundColor: "white",
            width: "28%",
            border: "1px solid #16423C",
          }}
        >
          <TransactionForm
            orders={orders}
            setOrders={setOrders}
            refreshData={fetchDataBarang}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
