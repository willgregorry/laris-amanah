import React from 'react';

const CustomScrollbarCSS = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 12px; 
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1; 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #888; 
      border-radius: 10px;
      border: 3px solid #f1f1f1; 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    } 
  `}</style>
);

export default function TableReport({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: '20px', border: "1px solid #ddd", borderRadius: "8px", textAlign: 'center' }}>
        <p>Tidak ada data untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <>
      <CustomScrollbarCSS />
      <div
        className="custom-scrollbar"
        style={{
          maxHeight: "264px", 
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <thead
            style={{
              fontWeight: "lighter",
              position: "sticky",
              top: 0,
              backgroundColor: "#16423C",
              zIndex: 1,
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>
                Nama Pelanggan
              </th>
              <th style={{ width: "120px", padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                Kode Barang
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>
                Nama Barang
              </th>
              <th style={{ width: "80px", padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                Jumlah
              </th>
              <th style={{ width: "20%", padding: "12px", border: "1px solid #ddd", textAlign: "right" }}>
                Total Harga
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#E9EFEC" : "#f9f9f9",
                }}
              >
                <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>
                  {row.namaPelanggan}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                  {row.kodeBarang}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>
                  {row.namaBarang}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
                  {row.jumlah}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "right" }}>
                  {`Rp ${row.totalHarga.toLocaleString("id-ID")}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}