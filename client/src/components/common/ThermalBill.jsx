import React from "react";

const ThermalBill = ({
  tableOrders,
  placeDetails,
  branchName,
  restaurantName,
  tableId,
  customerName,
  customerPhone,
  paymentMode,
  subtotal,
  tax,
  grandTotal
}) => {
  return (
    <div id="thermal-bill-print">
      <style>{`
        @media screen {
          #thermal-bill-print { display: none; }
        }

        @media print {
          @page {
            size: 58mm auto;
            margin: 0; /* Important: Removes browser headers/footers */
          }

          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
          }

          body * { visibility: hidden; }

          #thermal-bill-print, #thermal-bill-print * {
            visibility: visible;
          }

          #thermal-bill-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 48mm; /* 58mm minus small padding for hardware margins */
            padding: 2mm 5mm; 
            background: white;
            color: black;
            font-family: 'Courier New', Courier, monospace;
            line-height: 1.2;
          }

          .flex-row { 
            display: flex; 
            justify-content: space-between; 
            align-items: flex-start;
          }
          
          .text-center { text-align: center; }
          .dashed-border { 
            border-top: 1px dashed black; 
            margin: 5px 0; 
            width: 100%;
          }
        }
      `}</style>

      {/* Header */}
      <div className="text-center">
        <h2 style={{ fontSize: "14px", fontWeight: "900", margin: "0", textTransform: "uppercase" }}>
          {branchName || restaurantName}
        </h2>
        <p style={{ fontSize: "9px", margin: "2px 0" }}>Smart Dining Experience</p>
        <div className="dashed-border" />
        <p style={{ fontSize: "10px", fontWeight: "bold", margin: "2px 0" }}>
          {placeDetails?.floor} - {placeDetails?.type} {placeDetails?.number}
        </p>
        <p style={{ fontSize: "8px" }}>{new Date().toLocaleString()}</p>
      </div>

      {/* Customer Info */}
      <div style={{ fontSize: "9px", margin: "5px 0" }}>
        {customerName && <p style={{ margin: 0 }}>CUST: {customerName.toUpperCase()}</p>}
        {customerPhone && <p style={{ margin: 0 }}>PH: {customerPhone}</p>}
      </div>

      <div className="dashed-border" />

      {/* ITEMS TABLE */}
      <div style={{ fontSize: "10px" }}>
        <div className="flex-row" style={{ fontWeight: "bold", marginBottom: "3px" }}>
          <span>ITEM</span>
          <span>AMT</span>
        </div>
        {tableOrders?.flatMap((o) => o.items).map((item, i) => (
          <div key={i} className="flex-row" style={{ marginBottom: "3px" }}>
            <span style={{ maxWidth: "75%", wordWrap: "break-word" }}>
              {item.itemname} {item.selectedSize !== "Regular" ? `(${item.selectedSize})` : ""} x{item.quantity}
            </span>
            <span>{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="dashed-border" />

      {/* TOTALS */}
      <div style={{ fontSize: "10px" }}>
        <div className="flex-row">
          <span>SUBTOTAL:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex-row">
          <span>GST (18%):</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex-row" style={{ fontSize: "12px", fontWeight: "bold", marginTop: "4px" }}>
          <span>GRAND TOTAL:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center" style={{ marginTop: "10px", fontSize: "9px" }}>
        <p style={{ fontWeight: "bold", margin: "0" }}>
          PAID VIA: {paymentMode?.toUpperCase() || "CASH"}
        </p>
        <div className="dashed-border" />
        <p style={{ margin: "2px 0" }}>THANK YOU!</p>
        <p style={{ fontSize: "7px", marginTop: "5px" }}>Bill by www.thinknorder.in</p>
        {/* Extra spacing at the bottom so the printer doesn't cut off the text */}
        <div style={{ height: "10mm" }} />
      </div>
    </div>
  );
};

export default ThermalBill;