export default function TableInfo({ data, onAdd, onRemove }) {
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
                width: "120px",
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Kode Barang
            </th>
            <th
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Nama Barang
            </th>
            <th
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Satuan
            </th>
            <th
              style={{
                width: "50px",
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Stok
            </th>
            <th
              style={{
                width: "15%",
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Harga Satuan
            </th>
            <th
              style={{
                width: "15%",
                padding: "12px",
                border: "1px solid #ddd",
                textAlign: "center",
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
                {row.kode_barang}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {row.nama_barang}
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {row.satuan}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {row.stok}
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {"Rp " + row.harga_satuan.toLocaleString("id-ID") + ",00"}
              </td>
              <td
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <button
                    className="btn btn-outline-success rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "25px",
                      height: "25px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: 0,
                    }}
                    onClick={() => onAdd(row)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "25px",
                      height: "25px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: 0,
                    }}
                    onClick={() => onRemove(row.kode_barang)}
                  >
                    −
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
