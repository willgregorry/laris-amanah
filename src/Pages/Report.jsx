import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import Header from "./../Components/Header";
import SummaryCard from "./../Components/SummaryCard";
import RecentTransactionsTable from "./../Components/RecentTransactionsTable";
import DateFilter from "../Components/DateFilter";
import axios from "axios";

const pageTitleStyle = {
  color: "#16423C",
  fontWeight: "600",
  fontFamily: "Poppins, sans-serif",
  fontSize: "1.25rem",
  marginBottom: "1rem",
};

const titleAndFilterRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "28px",
};

function ReportPage() {
  const [summaryData, setSummaryData] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    day: "all",
    month: "6",
    year: "2025",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/transaksi/`
        );
        const allTransactions = response.data;

        const newFilteredTransactions = allTransactions.filter((t) => {
          if (!t.waktu_transaksi) return false;

          const dateObj = new Date(t.waktu_transaksi);
          const day = dateObj.getDate();
          const month = dateObj.getMonth() + 1;
          const year = dateObj.getFullYear();

          const yearMatch = +year === +filter.year;
          const monthMatch = +month === +filter.month;
          const dayMatch = filter.day === "all" || +day === +filter.day;

          return yearMatch && monthMatch && dayMatch;
        });

        setFilteredTransactions(newFilteredTransactions);

        const totalCustomers = new Set(
          newFilteredTransactions.map((t) => t.customer)
        ).size;
        const totalSales = newFilteredTransactions.reduce(
          (sum, t) => sum + parseFloat(t.total_harga),
          0
        );

        setSummaryData({
          totalCustomers: { value: totalCustomers, change: 0 },
          todaySales: { value: totalSales, change: 0, currency: "Rp" },
          profitPercentage: {
            value: 15.5,
            label: "Persentase Laba",
            isProfit: true,
          },
        });
      } catch (error) {
        console.error("Gagal mengambil data transaksi:", error);
        alert("Gagal memuat data transaksi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [filter]);

  const handleDownloadReport = () => {
    if (!filteredTransactions || filteredTransactions.length === 0) {
      alert("Tidak ada data transaksi untuk di-download.");
      return;
    }
    const headers = [
      "Nama Pelanggan",
      "Kode Barang",
      "Nama Barang",
      "Jumlah",
      "Total Belanja (Rp)",
    ];
    const rows = filteredTransactions.map((transaction) =>
      [
        `"${transaction.customerName.replace(/"/g, '""')}"`,
        transaction.itemCode,
        `"${transaction.itemName.replace(/"/g, '""')}"`,
        transaction.jumlah,
        transaction.totalPurchase,
      ].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `laporan_penjualan_${filter.year}-${filter.month}-${filter.day}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert("Browser Anda tidak mendukung fitur download otomatis.");
    }
  };

  if (!summaryData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="success" />
        <p className="ms-3">Mempersiapkan laporan...</p>
      </div>
    );
  }

  return (
    <Container fluid className="p-0">
      <div
        className="m-4 rounded-4"
        style={{
          backgroundColor: "#C4DAD2",
          // backgroundColor: 'red',
          height: "93.3vh",
          paddingBottom: "20px",
        }}
      >
        <Header />
        <div style={{ padding: "20px" }}>
          <div style={titleAndFilterRowStyle}>
            <h2 style={{ ...pageTitleStyle, marginBottom: 0 }}>
              Laporan Penjualan, !
            </h2>
            <DateFilter filter={filter} onFilterChange={handleFilterChange} />
          </div>

          <Row className="my-4">
            <Col md={4} className="mb-3">
              <SummaryCard
                title="Total Pelanggan"
                value={summaryData.totalCustomers.value}
                icon="bi-people-fill"
              />
            </Col>
            <Col md={4} className="mb-3">
              <SummaryCard
                title="Total Penjualan"
                value={`${
                  summaryData.todaySales.currency
                } ${summaryData.todaySales.value.toLocaleString("id-ID")}`}
                icon="bi-calendar-check"
              />
            </Col>
            <Col md={4} className="mb-3">
              <SummaryCard
                title={summaryData.profitPercentage.label}
                value={`${summaryData.profitPercentage.value}%`}
                isProfit={summaryData.profitPercentage.isProfit}
                icon={
                  summaryData.profitPercentage.isProfit
                    ? "bi-graph-up-arrow"
                    : "bi-graph-down-arrow"
                }
              />
            </Col>
          </Row>

          {isLoading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="success" />
            </div>
          ) : (
            <RecentTransactionsTable transactions={filteredTransactions} />
          )}

          <div style={buttonContainerStyle}>
            <Button
              variant="success"
              onClick={handleDownloadReport}
              style={{ backgroundColor: "#16423C", borderColor: "#16423C" }}
              disabled={isLoading || filteredTransactions.length === 0}
            >
              <i className="bi bi-download me-2"></i>Download Laporan
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ReportPage;
