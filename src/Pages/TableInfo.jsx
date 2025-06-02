export default function TableInfo({ data }) {
  return (
    <div
      style={{
        maxHeight: "90%",
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
            <th
              style={{
                width: "50px",
                padding: "12px",
                border: "1px solid #",
                textAlign: "left",
              }}
            >
              ID
            </th>
            <th
              style={{
                width: "95px",
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Kode Brg.
            </th>
            <th
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Nama Brg.
            </th>
            <th
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Satuan
            </th>
            <th
              style={{
                width: "15%",
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Harga Satuan
            </th>
            <th
              style={{
                width: "15%",
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Action
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
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {row.id}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {row.kode_barang}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {row.nama_barang}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {row.satuan}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {"Rp " + row.harga_satuan.toLocaleString("id-ID") + ",00"}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}