import React from 'react';
import TableReport from '../Pages/TableReport';

const transactionsSectionTitleStyle = {
  color: '#16423C',
  fontWeight: '600',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.25rem',
};

function RecentTransactionsTable({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div>
        <h4 style={transactionsSectionTitleStyle}>Transaksi Terkini</h4>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
          <p>Belum ada data transaksi terkini.</p>
        </div>
      </div>
    );
  }

  const formattedData = transactions.map(transaction => ({
    id: transaction.id,
    namaPelanggan: transaction.customerName,
    kodeBarang: transaction.itemCode,
    namaBarang: transaction.itemName,
    jumlah: 1, 
    totalHarga: transaction.totalPurchase, 
  }));

  return (
    <div> 
      <h4 style={transactionsSectionTitleStyle}>Transaksi Terkini</h4>
      
      {}
      {}
      <TableReport data={formattedData} />
    </div>
  );
}

export default RecentTransactionsTable;