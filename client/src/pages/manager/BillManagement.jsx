import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersForTable,
  createOrderByAdminItself,
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
  Receipt,
} from "lucide-react";
import { toast } from "react-hot-toast";

const BillManagement = ({
  tableCart,
  addToTableCart,
  removeFromTableCart,
  clearTableCart,
}) => {
  const { tableId } = useParams();
  const dispatch = useDispatch();

  const { tableOrders, loading, sessionClosing, error } = useSelector((state) => state.order);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (tableCart.length > 0) setIsCartOpen(true);
  }, [tableCart.length]);

  useEffect(() => {
    if (tableId) dispatch(fetchOrdersForTable(tableId));
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

  const handleCreateOrder = async () => {
    if (!tableCart.length) return toast.error("Queue is empty.");
    const result = await dispatch(
      createOrderByAdminItself({
        placeId: tableId,
        items: tableCart.map((item) => ({
          itemId: item._id,
          size: item.selectedPrice.label,
          quantity: item.qty,
        })),
      })
    );
    if (result.meta.requestStatus === "fulfilled") {
      clearTableCart();
      toast.success("Order punched to kitchen!");
    }
  };

  const handleSettleAndPrint = async () => {
    const result = await dispatch(closeSession({ placeId: tableId, paymentMode }));
    if (result.meta.requestStatus === "fulfilled") {
      setTimeout(() => { window.print(); }, 500);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-orange-100 overflow-hidden">
      {/* CSS FOR PRINTING - AUTHENTIC THERMAL STYLE */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #thermal-bill { 
            display: block !important; 
            width: 58mm; 
            padding: 4mm;
            color: #000;
            background: #fff;
            margin: 0;
          }
          body { background: white; }
        }
        @media screen {
          #thermal-bill { display: none; }
        }
      `}</style>

      {/* SCREEN HEADER */}
      <header className="p-6 bg-orange-950 text-white no-print">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-widest text-orange-500">Billing Logic</h2>
            <p className="text-2xl font-black italic uppercase tracking-tighter">Table {tableOrders[0]?.table || "..."}</p>
          </div>
          <div className="bg-orange-600 p-3 rounded-2xl shadow-lg shadow-orange-600/30">
            <Receipt size={24} />
          </div>
        </div>
      </header>

      {/* SCREEN BODY */}
      <main className="grow overflow-y-auto p-6 space-y-4 custom-scrollbar no-print bg-white">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-orange-400">
            <Loader className="animate-spin mb-4" size={32} />
            <p className="font-black uppercase text-[10px] tracking-widest">Syncing Bill...</p>
          </div>
        ) : tableOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-20">
            <ShoppingCart size={48} className="mb-2" />
            <p className="font-black uppercase text-xs tracking-widest">No Active Orders</p>
          </div>
        ) : (
          tableOrders.map((order) => (
            <div key={order._id} className="border-b border-orange-50 pb-4">
              <p className="text-[10px] text-gray-400 mb-3 font-black uppercase tracking-tighter">Ordered @ {new Date(order.createdAt).toLocaleTimeString()}</p>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 flex items-center justify-center bg-orange-50 text-orange-600 font-black rounded text-[10px]">{item.quantity}</span>
                    <div>
                      <p className="font-bold text-orange-950 text-xs uppercase">{item.itemname}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{item.selectedSize}</p>
                    </div>
                  </div>
                  <p className="font-black text-xs text-orange-950">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          ))
        )}
      </main>

      {/* SCREEN FOOTER */}
      <footer className="p-6 bg-white border-t-2 border-dashed border-orange-100 no-print">
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>Subtotal</span>
            <span className="text-orange-950">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>GST (18%)</span>
            <span className="text-orange-950">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-2xl font-black text-orange-950 uppercase italic pt-4 border-t border-orange-50">
            <span>Total</span>
            <span className="text-orange-600 tracking-tighter">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* PENDING CART UI */}
        {tableCart.length > 0 && (
          <div className="bg-black rounded-3xl p-5 mb-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart size={16} className="text-orange-600" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Queue ({tableCart.length} Items)</span>
              </div>
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="text-white/50">
                {isCartOpen ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
              </button>
            </div>
            {isCartOpen && (
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                {tableCart.map((item) => (
                  <div key={`${item._id}-${item.selectedPrice.label}`} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase tracking-tight">{item.name}</p>
                      <p className="text-[9px] text-orange-500 font-bold uppercase">{item.selectedPrice.label}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => removeFromTableCart(item._id, item.selectedPrice.label)} className="p-1 hover:text-orange-600 transition-colors"><Minus size={14}/></button>
                      <span className="text-xs font-black text-white">{item.qty}</span>
                      <button onClick={() => addToTableCart(item, item.selectedPrice)} className="p-1 hover:text-orange-600 transition-colors"><Plus size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={handleCreateOrder} className="w-full bg-orange-600 text-white py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all">
              Punch to Kitchen
            </button>
          </div>
        )}

        {/* PAYMENT SELECTION */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {paymentOptions.map((opt) => (
            <button
              key={opt.name}
              onClick={() => setPaymentMode(opt.name)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                paymentMode === opt.name ? "border-orange-600 bg-orange-50 text-orange-600 shadow-inner" : "border-transparent bg-gray-50 text-gray-400"
              }`}
            >
              {opt.icon}
              <span className="text-[9px] font-black uppercase tracking-widest">{opt.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleSettleAndPrint}
          disabled={tableOrders.length === 0 || sessionClosing}
          className="w-full bg-orange-950 hover:bg-orange-600 text-white py-5 rounded-[2rem] flex justify-center items-center gap-3 font-black uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-50"
        >
          {sessionClosing ? <Loader className="animate-spin" /> : <Printer />}
          Finalize & Print
        </button>
      </footer>

      {/* ========================================================
          THE THERMAL BILL (HIDDEN FROM SCREEN, SHOWN ONLY IN PRINT)
          ======================================================== */}
      <div id="thermal-bill">
        <div style={{ textAlign: "center", textTransform: "uppercase" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "900", margin: "0 0 4px 0" }}>ThinkNOrder</h2>
          <p style={{ fontSize: "10px", fontWeight: "700", margin: "0" }}>Smart Dining Experience</p>
          <div style={{ borderTop: "1px dashed #000", margin: "10px 0" }} />
          <p style={{ fontSize: "11px", fontWeight: "700", margin: "0" }}>TABLE: {tableOrders[0]?.table || tableId}</p>
          <p style={{ fontSize: "9px", margin: "2px 0" }}>{new Date().toLocaleString()}</p>
        </div>

        <div style={{ margin: "10px 0", fontSize: "11px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "900", borderBottom: "1px solid #000", paddingBottom: "4px" }}>
            <span>ITEM</span>
            <span>AMT</span>
          </div>
          {tableOrders.flatMap((o) => o.items).map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", margin: "6px 0", lineHeight: "1.2" }}>
              <span style={{ flex: 1, paddingRight: "4px" }}>
                {item.itemname} <br />
                <span style={{ fontSize: "9px", fontWeight: "normal" }}>({item.selectedSize}) x{item.quantity}</span>
              </span>
              <span style={{ fontWeight: "bold" }}>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px dashed #000", paddingTop: "10px", fontSize: "11px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>SUBTOTAL:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>GST (18%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "900", marginTop: "6px", borderTop: "1px solid #000", paddingTop: "6px" }}>
            <span>TOTAL:</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "10px" }}>
          <p style={{ margin: "2px 0", fontWeight: "bold" }}>PAID VIA: {paymentMode.toUpperCase()}</p>
          <div style={{ borderTop: "1px dashed #000", margin: "10px 0" }} />
          <p style={{ margin: "0" }}>THANKS FOR DINING WITH US!</p>
          <p style={{ margin: "0", fontSize: "8px" }}>thinknorder.io</p>
        </div>
      </div>
    </div>
  );
};

export default BillManagement;