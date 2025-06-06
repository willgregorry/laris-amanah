  import React, { useState, useEffect } from "react";
  import { Container, Row, Col, Button } from "react-bootstrap";
  import Header from "./../Components/Header";
  import SummaryCard from "./../Components/SummaryCard";
  import RecentTransactionsTable from "./../Components/RecentTransactionsTable";

  // akan disesuaikan saat ada be 
  const mockSummaryData = {
    totalRevenue: { value: 23570000, change: 2.0, currency: "Rp" },
    todaySales: { value: 2340000, change: -1.5, currency: "Rp" },
    profitPercentage: { value: 15.5, label: "Persentase Laba", isProfit: true },
  };

  const mockRecentTransactions = [
    {
      id: 1,
      customerName: "Budi Santoso",
      itemCode: "A300A",
      itemName: "Besi Beton A300 10mm",
      totalPurchase: 750000,
      jumlah: 15, 
    },
    {
      id: 2,
      customerName: "Ani Wijaya",
      itemCode: "P005K",
      itemName: "Paku Kayu 5cm Box",
      totalPurchase: 250000,
      jumlah: 5, 
    },
    {
      id: 3,
      customerName: "Citra Lestari",
      itemCode: "PVC012",
      itemName: "Pipa PVC 1/2 inch per mtr",
      totalPurchase: 150000,
      jumlah: 100, 
    },
    {
      id: 4,
      customerName: "Dewi Anggraini",
      itemCode: "KRMW01",
      itemName: "Keramik Lantai Motif Kayu 40x40",
      totalPurchase: 1200000,
      jumlah: 20, 
    },
    {
      id: 4,
      customerName: "Dewi Anggraini",
      itemCode: "KRMW01",
      itemName: "Keramik Lantai Motif Kayu 40x40",
      totalPurchase: 1200000,
      jumlah: 20, 
    },
    {
      id: 4,
      customerName: "Dewi Anggraini",
      itemCode: "KRMW01",
      itemName: "Keramik Lantai Motif Kayu 40x40",
      totalPurchase: 1200000,
      jumlah: 20, 
    },
    {
      id: 4,
      customerName: "Dewi Anggraini",
      itemCode: "KRMW01",
      itemName: "Keramik Lantai Motif Kayu 40x40",
      totalPurchase: 1200000,
      jumlah: 20, 
    },
    {
      id: 4,
      customerName: "Dewi Anggraini",
      itemCode: "KRMW01",
      itemName: "Keramik Lantai Motif Kayu 40x40",
      totalPurchase: 1200000,
      jumlah: 20, 
    },
    {
      id: 4,
      customerName: "Dewi Anggraini",
      itemCode: "KRMW01",
      itemName: "Keramik Lantai Motif Kayu 40x40",
      totalPurchase: 1200000,
      jumlah: 20, 
    },
    {
      id: 4,
      customerName: "Dewi Anggraini",
      itemCode: "KRMW01",
      itemName: "Keramik Lantai Motif Kayu 40x40",
      totalPurchase: 1200000,
      jumlah: 20, 
    },
  ];

  const pageTitleStyle = {
    color: "#16423C",
    fontWeight: "600",
    fontFamily: "Poppins, sans-serif",
    fontSize: '1.25rem',
  };

  const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '28px', 
};

  function ReportPage() {
    const [summaryData, setSummaryData] = useState(null);
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
      setSummaryData(mockSummaryData);
      setRecentTransactions(mockRecentTransactions);
    }, []);

    const handleDownloadReport = () => {
      if (recentTransactions.length === 0) {
        alert("Tidak ada data transaksi untuk di-download.");
        return;
      }
      const headers = ["Nama Pelanggan", "Kode Barang", "Nama Barang", "Jumlah", "Total Belanja (Rp)"];
      const rows = recentTransactions.map((transaction) =>
        [
          `"${transaction.customerName.replace(/"/g, '""')}"`,
          transaction.itemCode,
          `"${transaction.itemName.replace(/"/g, '""')}"`,
          transaction.totalPurchase,
        ].join(",")
      );
      const csvContent = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "laporan_penjualan.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        alert("Browser Anda tidak mendukung fitur download otomatis. Silakan coba browser lain.");
      }
    };

    if (!summaryData) {
    return (
      <p style={{ textAlign: "center", marginTop: "5rem" }}>
        Memuat data laporan...
      </p>
    );
  }

    return (
    <Container fluid className="p-0" style={{height: '96.6vh'}}>
      <div
        className="m-4 rounded-4"
        style={{
          backgroundColor: "#C4DAD2",
          paddingBottom: '4px'
        }}
      >
        <Header />
        <div style={{ padding: "20px" }}>
          
          {}
          <div>
            <h2 style={pageTitleStyle}>Laporan Penjualan, !</h2>
          </div>

          <Row className="mt-3">
            <Col md={4} className="mb-3">
              <SummaryCard
                title="Total Pendapatan"
                value={`${summaryData.totalRevenue.currency} ${summaryData.totalRevenue.value.toLocaleString("id-ID")}`}
                change={summaryData.totalRevenue.change}
                icon="bi-cash-coin"
              />
            </Col>
            <Col md={4} className="mb-3">
              <SummaryCard
                title="Penjualan Hari Ini"
                value={`${summaryData.todaySales.currency} ${summaryData.todaySales.value.toLocaleString("id-ID")}`}
                change={summaryData.todaySales.change}
                icon="bi-calendar-day"
              />
            </Col>
            <Col md={4} className="mb-3">
              <SummaryCard
                title={summaryData.profitPercentage.label}
                value={`${summaryData.profitPercentage.value.toLocaleString("id-ID", {
                  style: "decimal",
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}%`}
                isProfit={summaryData.profitPercentage.isProfit}
                icon={summaryData.profitPercentage.isProfit ? "bi-graph-up-arrow" : "bi-graph-down-arrow"}
              />
            </Col>
          </Row>
          
          <RecentTransactionsTable transactions={recentTransactions} />

          {}
          <div style={buttonContainerStyle}>
            <Button
              variant="success"
              onClick={handleDownloadReport}
              style={{ backgroundColor: "#16423C", borderColor: "#16423C" }}
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