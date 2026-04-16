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
          /* Force hide everything else */
          body * { visibility: hidden; }
          
          #thermal-bill-print, #thermal-bill-print * { 
            visibility: visible; 
          }

          #thermal-bill-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 58mm; /* Standard Roll Width */
            padding: 2mm;
            background: white;
            color: black;
            font-family: 'Courier New', Courier, monospace;
          }

          /* Remove browser margins and set paper size */
          @page {
            size: 58mm auto; /* Critical for Thermal Printers */
            margin: 0;
          }

          /* Utility for receipt layout */
          .flex-row { display: flex; justify-content: space-between; }
          .text-center { text-align: center; }
          .dashed-border { border-top: 1px dashed black; margin: 5px 0; }
        }
      `}</style>

      <div className="text-center" style={{ textTransform: "uppercase" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "900", margin: "0" }}>{branchName}</h2>
        <p style={{ fontSize: "10px", margin: "2px 0" }}>Smart Dining Experience</p>
        <div className="dashed-border" />
        <p style={{ fontSize: "11px", fontWeight: "bold" }}>{placeDetails?.floor} - {placeDetails?.type} {placeDetails?.number}</p>
        <p style={{ fontSize: "9px" }}>{new Date().toLocaleString()}</p>
      </div>

      <div style={{ fontSize: "10px", margin: "5px 0" }}>
        {customerName && <p style={{ margin: 0 }}>CUST: {customerName.toUpperCase()}</p>}
        <p style={{ margin: 0 }}>PH: {customerPhone}</p>
      </div>

      <div className="dashed-border" />

      {/* ITEMS */}
      <div style={{ fontSize: "11px" }}>
        <div className="flex-row" style={{ fontWeight: "bold", marginBottom: "5px" }}>
          <span>ITEM</span>
          <span>AMT</span>
        </div>
        {tableOrders?.flatMap((o) => o.items).map((item, i) => (
          <div key={i} className="flex-row" style={{ marginBottom: "4px" }}>
            <span style={{ maxWidth: "70%" }}>
              {item.itemname} ({item.selectedSize}) x{item.quantity}
            </span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="dashed-border" />

      {/* TOTALS */}
      <div style={{ fontSize: "11px" }}>
        <div className="flex-row">
          <span>SUBTOTAL:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex-row">
          <span>GST (18%):</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex-row" style={{ fontSize: "14px", fontWeight: "bold", marginTop: "5px" }}>
          <span>TOTAL:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center" style={{ marginTop: "15px", fontSize: "10px" }}>
        <p style={{ fontWeight: "bold" }}>
  PAID VIA: {paymentMode?.toUpperCase() || "CASH"}
</p>
        <div className="dashed-border" />
        <p>THANKS FOR DINING WITH US!</p>
        <p style={{ fontSize: "8px" }}>Bill by www.thinknorder.in</p>
      </div>
    </div>
  );
};

export default ThermalBill;