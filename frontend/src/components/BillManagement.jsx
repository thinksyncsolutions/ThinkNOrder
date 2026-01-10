import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Minus
} from "lucide-react";

const baseURL = import.meta.env.VITE_API_BASE_URL || "YOUR_API_BASE_URL";

const BillManagement = ({ tableCart, addToTableCart, removeFromTableCart, clearTableCart }) => {
  const { tableId } = useParams();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [loading, setLoading] = useState(true);
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  useEffect(() => {
    if (tableCart.length > 0) {
      setIsCartOpen(true);
    }
  }, [tableCart]);

  const fetchTableOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/order/${tableId}`, {
        withCredentials: true,
      });
      if (response.data.orders && response.data.orders.length > 0) {
      setOrders(response.data.orders);
      setMessage(""); // clear message
    }
    else {
      setOrders([]);
      setMessage(response.data.message || "No orders found");
    }
    } catch (error) {  
      setOrders([]);
      setMessage(error.response?.data?.message || "No orders found");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tableId) {
      fetchTableOrders();
    }
  }, [tableId]);

  const handleCreateOrder = async () => {
    if (tableCart.length === 0) {
      alert("Cart is empty. Please add items before placing an order.");
      return;
    }
    try {
      const response = await axios.post(
        `${baseURL}/order/create-orderByAdminItself`,
        {
          placeId: tableId,
          items: tableCart.map((item) => ({
            itemId: item.itemId,
            size: item.selectedSize,
            quantity: item.quantity,
          })),
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("Order placed successfully!");
        clearTableCart(); // Clear the cart after successful order
        fetchTableOrders(); // Refresh orders list
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };
  
const handlePrint = () => {
  const printContent = document.getElementById("thermal-bill").innerHTML;
  const originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  window.location.reload();
};

const handleSettleAndPrint = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/order/close-session`,
        { placeId: tableId, paymentMode },
        { withCredentials: true }
      );
      if (response.status === 200) {
        handlePrint();
        alert("Session closed successfully!");
        fetchTableOrders(); // Refresh orders list
      } 
    } catch (error) {
      console.error("Error closing session:", error);
      alert("Error closing session. Please try again.");
    }
  }


  const grandTotal = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const taxRate = 0.18;
  const subtotal = grandTotal / (1 + taxRate);
  const tax = grandTotal - subtotal;
  
  const paymentOptions = [
    { name: "Cash", icon: <Wallet size={20} /> },
    { name: "UPI", icon: <ScanLine size={20} /> },
    { name: "Card", icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="bg-slate-50 h-full flex flex-col shadow-lg font-sans printable-area rounded-xl overflow-hidden border border-slate-200">
      <header className="p-4 border-b border-slate-200 text-center no-print">
        <h2 className="text-xl font-bold text-slate-800">
          Bill Details
        </h2>
        {orders.length > 0 && orders[0].table && (
          <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
            Floor: {orders[0].floor} | Table: {orders[0].table}
          </p>
        )}
      </header>

      <main className="flex-grow overflow-y-auto p-4 md:p-6 bg-white">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Loader size={40} className="mb-4 animate-spin text-purple-500" />
            <p className="font-semibold text-slate-500">Loading Bill...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center">
            <ShoppingCart size={40} className="mb-4" />
            <p className="font-semibold text-slate-600">This Bill is Empty</p>
            <p className="text-sm">{message || "The Bill is Empty"}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id}>
                 <p className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">
                   Order @ {new Date(order.createdAt).toLocaleTimeString()}
                 </p>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={item.itemId || index} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-b-0">
                      <div className="flex-shrink-0 bg-slate-100 text-purple-600 font-bold w-8 h-8 flex items-center justify-center rounded-full text-xs">
                        {item.quantity}x
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-sm text-slate-700">{item.itemname}</p>
                        <p className="text-xs text-slate-500 capitalize">{item.selectedSize}</p>
                      </div>
                      <p className="font-semibold w-20 text-right text-slate-700">
                        ₹{item.price.toFixed(2)}
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
            <span>Taxes & Charges ({taxRate * 100}%)</span>
            <span className="font-medium text-slate-800">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-slate-900 border-t border-slate-300 pt-2 mt-2">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
        
        {tableCart.length > 0 && (
          <div className="border border-slate-200 rounded-lg mb-4 bg-white">
            <button
              onClick={toggleCart}
              className="w-full flex justify-between items-center p-3 text-left font-semibold text-purple-700 focus:outline-none"
            >
              <span>Current Cart ({tableCart.length} items)</span>
              {isCartOpen ? <ArrowDown size={20} /> : <ArrowUp size={20} />}
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${isCartOpen ? "max-h-[500px]" : "max-h-0"}`}
            >
              <div className="p-3 border-t border-slate-200 space-y-3">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tableCart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded-md">
                      <div>
                         <p className="text-sm font-semibold text-slate-700">{item.itemname} ({item.selectedSize})</p>
                        <p className="text-xs text-slate-500">
                          {`₹${item.price.toFixed(2)} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromTableCart(item.itemId, item.selectedPrice._id)} className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                          <Minus size={14} />
                        </button>
                        <span className="px-1 text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => addToTableCart(item)} className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleCreateOrder}
                  className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-bold text-sm hover:bg-purple-700 transition-colors shadow-sm"
                >
                  Place New Order
                </button>
              </div>
            </div>
          </div>
        )}
      
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Payment Mode</h4>
          <div className="grid grid-cols-3 gap-2">
            {paymentOptions.map((opt) => (
              <button
                key={opt.name}
                onClick={() => setPaymentMode(opt.name)}
                className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border-2 transition-all duration-200 ${
                  paymentMode === opt.name
                    ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-purple-300 hover:text-purple-600'
                }`}
              >
                {opt.icon}
                <span className="text-xs font-semibold">{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleSettleAndPrint}
          disabled={orders.length === 0 || loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          <Printer size={18} /> Settle & Print Bill
        </button>
      </footer>


<div>
  {/* Inline print styles */}
  <style>
    {`
      @media print {
        #thermal-bill {
          display: block !important;
          width: 58mm; /* change to 80mm if needed */
          font-family: 'Courier New', monospace;
          font-size: 10px;
          margin: 0;
          padding: 0;
        }

        body * {
          visibility: hidden;
        }

        #thermal-bill, #thermal-bill * {
          visibility: visible;
        }

        #thermal-bill {
          margin: 0 auto;
        }

        #thermal-bill h2 {
          font-size: 12px;
          text-align: center;
          font-weight: bold;
          margin-bottom: 4px;
        }

        #thermal-bill p, #thermal-bill div, #thermal-bill span {
          font-size: 10px;
        }

        #thermal-bill hr {
          border: 1px dashed black;
          margin: 4px 0;
        }
      }
    `}
  </style>

  <div id="thermal-bill" className="hidden">
    <h2>🍴 My Restaurant</h2>
    <p className="text-center">
      Floor: {orders[0]?.floor || "-"} | Table: {orders[0]?.table || "-"}
    </p>
    <hr />

    {orders.map((order) =>
      order.items.map((item, idx) => (
        <div key={idx} className="flex justify-between">
          <span>{item.itemname} x{item.quantity}</span>
          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))
    )}

    <hr />
    <p className="flex justify-between">
      <span>Subtotal:</span>
      <span>₹{subtotal.toFixed(2)}</span>
    </p>
    <p className="flex justify-between">
      <span>Tax:</span>
      <span>₹{tax.toFixed(2)}</span>
    </p>
    <p className="flex justify-between font-bold">
      <span>Total:</span>
      <span>₹{grandTotal.toFixed(2)}</span>
    </p>
    <p>Payment: {paymentMode}</p>

    <p className="text-center mt-2">🙏 Thank You! Visit Again 🙏</p>
  </div>
</div>



    </div>
  );
};

export default BillManagement;