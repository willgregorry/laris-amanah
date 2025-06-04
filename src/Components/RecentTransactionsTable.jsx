import React from 'react';
import { Table, Button } from 'react-bootstrap';

const transactionsSectionTitleStyle = {
  color: '#16423C',
  fontWeight: '600',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: '1rem',
  fontSize: '1.25rem',
  marginTop: '2rem',
};

const customTableHeaderStyle = {
  backgroundColor: '#16423C',
  color: '#ffffff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '500',
};

const tableCellStyle = {
  verticalAlign: 'middle',
  padding: '0.75rem',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '0.9rem',
};

const tableTagStyle = {
  borderRadius: '0.5rem', 
  overflow: 'hidden',     
};

const buttonContainerStyle = {
    textAlign: 'center',
    marginTop: '1rem',
    paddingBottom: '0.5rem'
};
function RecentTransactionsTable({ transactions }) {
    return (
        <div> 
            <h4 style={transactionsSectionTitleStyle}>Transaksi Terkini</h4>
            <Table 
                responsive 
                hover 
                striped 
                bordered 
                className="mb-0" 
                style={tableTagStyle} 
            >
                <thead style={customTableHeaderStyle}> 
                    <tr>
                        {}
                        <th style={tableCellStyle}>Nama Pelanggan</th>
                        <th style={tableCellStyle}>Kode Barang</th>
                        <th style={tableCellStyle}>Nama Barang</th>
                        <th style={{...tableCellStyle, textAlign: 'end'}}>Total Belanja (Rp)</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td style={tableCellStyle}>{transaction.customerName}</td>
                                <td style={tableCellStyle}>{transaction.itemCode}</td>
                                <td style={tableCellStyle}>{transaction.itemName}</td>
                                <td style={{...tableCellStyle, textAlign: 'end'}}>{transaction.totalPurchase.toLocaleString('id-ID')}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{...tableCellStyle, textAlign: 'center', padding: '1rem'}}>
                                Belum ada transaksi terkini.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {transactions && transactions.length > 0 && (
                <div style={buttonContainerStyle}>
                    <Button variant="outline-success" size="sm" style={{borderColor: '#16423C', color: '#16423C'}}>
                        Lihat Semua Transaksi
                    </Button>
                </div>
            )}
        </div>
    );
}

export default RecentTransactionsTable;