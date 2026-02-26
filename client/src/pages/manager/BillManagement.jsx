import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersForTable,
  createOrder,
  closeSession,
} from "../../redux/features/order/order.thunk";
import {
  CreditCard,
  Loader,
  Printer,
  ShoppingCart,
  ScanLine,
  Wallet,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
} from "lucide-react";

const BillManagement = ({
  tableCart,
  addToTableCart,
  removeFromTableCart,
  clearTableCart,
}) => {
  const { tableId } = useParams();
  const dispatch = useDispatch();

  // Redux State
  const { tableOrders, loading, sessionClosing } = useSelector(
    (state) => state.order
  );

  const [paymentMode, setPaymentMode] = useState("Cash");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auto-open cart when items are added
  useEffect(() => {
    if (tableCart.length > 0) setIsCartOpen(true);
  }, [tableCart.length]);

  // Fetch orders on load
  useEffect(() => {
    if (tableId) {
      dispatch(fetchOrdersForTable(tableId));
    }
  }, [tableId, dispatch]);

  // Calculations
  const grandTotal = tableOrders.reduce((acc, order) => acc + order.totalAmount, 0);
  const taxRate = 0.18;
  const subtotal = grandTotal / (1 + taxRate);
  const tax = grandTotal - subtotal;

  const paymentOptions = [
    { name: "Cash", icon: <Wallet size={20} /> },
    { name: "UPI", icon: <ScanLine size={20} /> },
    { name: "Card", icon: <CreditCard size={20} /> },
  ];

  // Actions
  const handleCreateOrder = async () => {
    if (!tableCart.length) return;

    const result = await dispatch(
      createOrder({
        placeId: tableId,
        items: tableCart.map((item) => ({
          itemId: item.itemId,
          size: item.selectedSize,
          quantity: item.quantity,
        })),
      })
    );


    if (result.meta.requestStatus === "fulfilled") {
      clearTableCart();
    }
  };

  const handleSettleAndPrint = async () => {
    const result = await dispatch(
      closeSession({ placeId: tableId, paymentMode })
    );

    if (result.meta.requestStatus === "fulfilled") {
      // Small timeout to ensure state reflects if needed before print
      setTimeout(() => {
        window.print();
      }, 500);
    }
  };

  return (
    <div className="bg-slate-50 h-full flex flex-col shadow-lg font-sans rounded-xl overflow-hidden border border-slate-200">
      {/* CSS for Thermal Printing */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #thermal-bill { 
            display: block !important; 
            width: 58mm; 
            font-family: 'Courier New', monospace; 
            padding: 5px;
          }
          body { background: white; }
          .printable-area { border: none; shadow: none; }
        }
        @media screen {
          #thermal-bill { display: none; }
        }
      `}</style>

      <header className="p-4 border-b border-slate-200 text-center no-print bg-white">
        <h2 className="text-xl font-bold text-slate-800">Bill Details</h2>
        {tableOrders.length > 0 && (
          <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
            Table: {tableOrders[0].table || tableId}
          </p>
        )}
      </header>

      <main className="flex-grow overflow-y-auto p-4 md:p-6 bg-white no-print">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Loader size={40} className="mb-4 animate-spin text-purple-500" />
            <p className="font-semibold text-slate-500">Loading Bill...</p>
          </div>
        ) : tableOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center">
            <ShoppingCart size={40} className="mb-4" />
            <p className="font-semibold text-slate-600">No active orders</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tableOrders.map((order) => (
              <div key={order._id} className="border-b border-slate-50 pb-2">
                <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">
                  Order @ {new Date(order.createdAt).toLocaleTimeString()}
                </p>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 bg-slate-100 text-purple-600 font-bold w-8 h-8 flex items-center justify-center rounded-full text-xs">
                        {item.quantity}x
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-sm text-slate-700">{item.itemname}</p>
                        <p className="text-xs text-slate-500 capitalize">{item.selectedSize}</p>
                      </div>
                      <p className="font-semibold text-right text-slate-700">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="p-4 md:p-6 border-t-2 border-dashed bg-slate-50 no-print">
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="font-medium text-slate-800">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>GST ({taxRate * 100}%)</span>
            <span className="font-medium text-slate-800">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-slate-900 border-t border-slate-300 pt-2 mt-2">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Current Cart Section */}
        {tableCart.length > 0 && (
          <div className="border border-slate-200 rounded-lg mb-4 bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="w-full flex justify-between items-center p-3 font-semibold text-purple-700"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart size={18} /> Pending Items ({tableCart.length})
              </span>
              {isCartOpen ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
            </button>
            {isCartOpen && (
              <div className="p-3 border-t border-slate-100 bg-white">
                <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                  {tableCart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded-md">
                      <div>
                        <p className="text-xs font-bold text-slate-700">{item.itemname}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{item.selectedSize}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => removeFromTableCart(item.itemId, item.selectedPrice?._id)} className="p-1 bg-red-50 text-red-500 rounded-full">
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => addToTableCart(item)} className="p-1 bg-green-50 text-green-500 rounded-full">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleCreateOrder}
                  className="w-full py-2 bg-purple-600 text-white rounded-lg font-bold text-sm hover:bg-purple-700"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        )}

        {/* Payment Selection */}
        <div className="mb-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Payment</h4>
          <div className="grid grid-cols-3 gap-2">
            {paymentOptions.map((opt) => (
              <button
                key={opt.name}
                onClick={() => setPaymentMode(opt.name)}
                className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl border-2 transition-all ${
                  paymentMode === opt.name
                    ? "border-purple-600 bg-purple-50 text-purple-700"
                    : "border-transparent bg-white text-slate-400 hover:bg-slate-100"
                }`}
              >
                {opt.icon}
                <span className="text-[10px] font-bold">{opt.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSettleAndPrint}
          disabled={tableOrders.length === 0 || sessionClosing}
          className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all disabled:bg-slate-200"
        >
          {sessionClosing ? <Loader className="animate-spin" size={18} /> : <Printer size={18} />}
          Settle & Print Bill
        </button>
      </footer>

      {/* Hidden Thermal Bill for Printing */}
      <div id="thermal-bill">
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h2 style={{ fontSize: "16px", margin: "0" }}>MY RESTAURANT</h2>
          <p style={{ fontSize: "10px" }}>Table: {tableOrders[0]?.table || tableId}</p>
          <p style={{ fontSize: "10px" }}>Date: {new Date().toLocaleString()}</p>
        </div>
        <div style={{ borderTop: "1px dashed #000", paddingTop: "5px" }}>
          {tableOrders.flatMap(o => o.items).map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "2px" }}>
              <span>{item.itemname} x{item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px dashed #000", marginTop: "5px", paddingTop: "5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
            <span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
            <span>GST:</span><span>₹{tax.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "bold" }}>
            <span>Total:</span><span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "10px" }}>
          <p>Payment: {paymentMode}</p>
          <p>Thank You! Visit Again</p>
        </div>
      </div>
    </div>
  );
};

export default BillManagement;