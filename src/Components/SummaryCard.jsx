import React from 'react';
import { Row, Col } from 'react-bootstrap';

const summaryCardCustomStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #16423C',
    borderLeft: '5px solid #16423C', 
    borderRadius: '4px',
    padding: '15px',
    height: '100%',
};

const summaryCardIconBaseStyle = {
    fontSize: '2rem',
    padding: '10px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    color: '#fff',
};

const summaryCardTitleStyle = {
    color: '#495057',
    fontSize: '0.9rem',
    marginBottom: '5px',
};

const summaryCardValueStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#212529',
};

const summaryCardChangeStyle = {
    fontSize: '0.85rem',
};

const iconProfitStyle = { backgroundColor: '#16423C' };

function SummaryCard({ title, value, change, icon, detail }) {
    let iconStyle = {...summaryCardIconBaseStyle, ...iconProfitStyle};

    if (change !== undefined && change !== null) {
        const isPositive = change >= 0;
        changeTextStyle = isPositive ? textProfitStyle : textLossStyle;
    }


    return (
        <div style={summaryCardCustomStyle}>
            <Row className="align-items-center h-100">
                <Col xs="auto">
                    <div style={iconStyle}>
                        <i className={`bi ${icon}`} style={{ verticalAlign: 'middle' }}></i>
                    </div>
                </Col>
                <Col>
                    <h6 style={summaryCardTitleStyle}>{title}</h6>
                    <div style={summaryCardValueStyle}>{value}</div>
                    {change !== undefined && change !== null && (
                        <small style={{...summaryCardChangeStyle, ...changeTextStyle}}>
                            <i className={`bi ${change >= 0 ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}></i>
                            {change > 0 ? '+' : ''}{change.toLocaleString('id-ID', { style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
                        </small>
                    )}
                    {detail && <small className="text-muted d-block">{detail}</small>}
                </Col>
            </Row>
        </div>
    );
}

export default SummaryCard;