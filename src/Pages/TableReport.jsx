import React from 'react';

// Komponen kecil untuk menampung CSS kustom kita.
// Ini adalah cara rapi untuk memasukkan blok <style> di dalam JSX.
const CustomScrollbarCSS = () => (
  <style>{`
    /* Menargetkan elemen dengan class .custom-scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
      width: 12px; /* Lebar scrollbar */
    }

    /* Style untuk track (latar belakang) */
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1; /* Warna latar yang sangat terang */
    }

    /* Style untuk thumb (bagian yang bisa digeser) */
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #888; /* Warna abu-abu */
      border-radius: 10px; /* Membuat ujungnya melengkung */
      border: 3px solid #f1f1f1; /* Memberi jarak antara thumb dan track */
    }

    /* Style untuk thumb saat di-hover */
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #555; /* Warna menjadi lebih gelap */
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
    // Kita gunakan React Fragment (<>) untuk membungkus style dan div utama
    <>
      <CustomScrollbarCSS />
      <div
        className="custom-scrollbar" // Terapkan class di sini
        style={{
          // Mengubah maxHeight ke pixel agar lebih terprediksi
          maxHeight: "450px", 
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
            {/* Isi thead tidak berubah */}
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
            {/* Isi tbody tidak berubah */}
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