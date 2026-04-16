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
  Clock,
  User,
  Phone
} from "lucide-react";
import { toast } from "react-hot-toast";
import ThermalBill from "../../components/common/ThermalBill";

const BillManagement = ({
  tableCart,
  addToTableCart,
  removeFromTableCart,
  clearTableCart,
  placeDetails,
}) => {
  const { tableId } = useParams();
  const dispatch = useDispatch();

  const { tableOrders, loading, sessionClosing, error } = useSelector((state) => state.order);
  const {branchName, restaurantName} = useSelector((state) => state.auth.user);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // New States for Customer Info
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [billSnapshot, setBillSnapshot] = useState(null);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  console.log(error)

  useEffect(() => {
    if (tableCart.length > 0) setIsCartOpen(true);
  }, [tableCart.length]);

  useEffect(() => {
    if (tableId) dispatch(fetchOrdersForTable(tableId));
  }, [tableId, dispatch]);

  const subtotal = tableOrders.reduce((acc, order) => acc + order.totalAmount, 0);
  const taxRate = import.meta.env.VITE_TAX_RATE || 0.18;
  const grandTotal = subtotal * (1 + taxRate);
  const tax = grandTotal - subtotal;

  const paymentOptions = [
    { name: "Cash", icon: <Wallet size={14} /> },
    { name: "UPI", icon: <ScanLine size={14} /> },
    { name: "Card", icon: <CreditCard size={14} /> },
    { name: "Pay Later", icon: <Clock size={14} /> },
  ];

  const handleCreateOrder = async () => {
    if (!tableCart.length) return toast.error("Queue is empty.");
    const result = await dispatch(
      createOrderByAdminItself({
        placeId: tableId,
        items: tableCart.map((item) => ({
          itemId: item._id,
          size: item.selectedPrice.label,
          quantity: item.quantity,
        })),
      })
    );
    if (result.meta.requestStatus === "fulfilled") {
      clearTableCart();
      toast.success("Order punched to kitchen!");
    }
  };

const handleSettleAndPrint = async () => {
  try {

    if (!customerPhone || customerPhone.length !== 10) {
      return toast.error("Please enter a valid phone number");
    }

    const snapshot = {
      tableOrders,
      tableId,
      customerName,
      customerPhone,
      paymentMode,
      subtotal,
      tax,
      grandTotal
    };

    setBillSnapshot(snapshot);

    // PRINT FIRST
    setTimeout(() => {
      window.print();
    }, 300);

    // CLOSE SESSION AFTER
    await dispatch(
      closeSession({
        placeId: tableId,
        paymentMode,
        customerName,
        customerPhone
      })
    ).unwrap();

    toast.success("Bill Settled");

  } catch (err) {
    toast.error("Failed to settle bill");
  }
};

  return (
    <div className="h-full flex flex-col bg-white border-l border-orange-100 overflow-hidden">
      {/* SCREEN HEADER */}
     <header className="px-4 py-3 bg-orange-950 text-white no-print">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-black italic uppercase tracking-tighter">
                Table {placeDetails?.number || "..."}
              </p>
              <span className="text-[10px] bg-orange-600 px-2 py-0.5 rounded-full font-bold uppercase">
                {placeDetails?.type || "Standard"}
              </span>
            </div>
            <p className="text-[9px] font-bold text-orange-400 uppercase tracking-[0.2em]">
              {placeDetails?.floor || "Main Hall"} • Capacity: {placeDetails?.capacity || 0}
            </p>
          </div>
          <div className="bg-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-600/30">
            <Receipt size={18} />
          </div>
        </div>
      </header>

      {/* SCREEN BODY */}
      <main className="grow overflow-y-auto p-4 space-y-2 custom-scrollbar no-print bg-white">
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
          <>
            {/* CUSTOMER INFO INPUTS */}
            <div className="mb-6 space-y-2 border-b border-orange-100 pb-4">
               <div className="relative">
                  <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                  <input 
                    type="tel" 
                    maxLength={10}
                    placeholder="CUSTOMER PHONE (REQ)" 
                    className="w-full pl-8 pr-3 py-2 bg-gray-50 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
               </div>
               <div className="relative">
                  <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                  <input 
                    type="text" 
                    placeholder="CUSTOMER NAME (OPTIONAL)" 
                    className="w-full pl-8 pr-3 py-2 bg-gray-50 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
               </div>
            </div>

            {tableOrders.map((order) => (
              <div key={order._id} className="border-b border-orange-50 pb-2">
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
            ))}
          </>
        )}
      </main>

      {/* SCREEN FOOTER */}
      <footer className="p-4 bg-white border-t-2 border-dashed border-orange-100 no-print">
        {/* ... (Grand Total & Cart UI remain the same) ... */}
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>Subtotal</span>
            <span className="text-orange-950">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>GST (18%)</span>
            <span className="text-orange-950">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-2xl font-black text-orange-950 uppercase italic pt-2 border-t border-orange-50">
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
                    <div className="flex items-center gap-3 text-white">
                      <button onClick={() => removeFromTableCart(item._id, item.selectedPrice.label)} className="p-1 hover:text-orange-600 transition-colors"><Minus size={14}/></button>
                      <span className="text-xs font-black">{item.quantity}</span>
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

        <div className="grid grid-cols-4 gap-2 mb-4">
          {paymentOptions.map((opt) => (
            <button
              key={opt.name}
              onClick={() => setPaymentMode(opt.name)}
              className={`p-1 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
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
          className="w-full bg-orange-950 hover:bg-orange-600 text-white py-4 rounded-[2rem] flex justify-center items-center gap-3 font-black uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-50"
        >
          {sessionClosing ? <Loader className="animate-spin" /> : <Printer />}
          Finalize & Print
        </button>
      </footer>

      {/* THERMAL BILL PRINT VERSION */}
      <div id="thermal-bill-print">
  <ThermalBill
  tableOrders={billSnapshot?.tableOrders || []}
  placeDetails={placeDetails}
  branchName={branchName}
  restaurantName={restaurantName}
  tableId={billSnapshot?.tableId}
  customerName={billSnapshot?.customerName}
  customerPhone={billSnapshot?.customerPhone}
  paymentMode={billSnapshot?.paymentMode}
  subtotal={billSnapshot?.subtotal || 0}
  tax={billSnapshot?.tax || 0}
  grandTotal={billSnapshot?.grandTotal || 0}
/>
</div>

    </div>
  );
};

export default BillManagement;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchOrdersForTable,
//   createOrderByAdminItself,
//   closeSession,
// } from "../../redux/features/order/order.thunk";
// import {
//   CreditCard,
//   Loader,
//   Printer,
//   ShoppingCart,
//   ScanLine,
//   Wallet,
//   ArrowUp,
//   ArrowDown,
//   Plus,
//   Minus,
//   Receipt,
//   Clock,
//   User,
//   Phone
// } from "lucide-react";
// import { toast } from "react-hot-toast";
// import ThermalBill from "../../components/common/ThermalBill";

// const BillManagement = ({
//   tableCart,
//   addToTableCart,
//   removeFromTableCart,
//   clearTableCart,
//   placeDetails,
// }) => {
//   const { tableId } = useParams();
//   const dispatch = useDispatch();

//   const { tableOrders, loading, sessionClosing, error } = useSelector((state) => state.order);
//   const [paymentMode, setPaymentMode] = useState("Cash");
//   const [isCartOpen, setIsCartOpen] = useState(false);
  
//   // New States for Customer Info
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [billSnapshot, setBillSnapshot] = useState(null);

//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);

//   console.log(error)

//   useEffect(() => {
//     if (tableCart.length > 0) setIsCartOpen(true);
//   }, [tableCart.length]);

//   useEffect(() => {
//     if (tableId) dispatch(fetchOrdersForTable(tableId));
//   }, [tableId, dispatch]);

//   const grandTotal = tableOrders.reduce((acc, order) => acc + order.totalAmount, 0);
//   const taxRate = 0.18;
//   const subtotal = grandTotal / (1 + taxRate);
//   const tax = grandTotal - subtotal;

//   const paymentOptions = [
//     { name: "Cash", icon: <Wallet size={14} /> },
//     { name: "UPI", icon: <ScanLine size={14} /> },
//     { name: "Card", icon: <CreditCard size={14} /> },
//     { name: "Pay Later", icon: <Clock size={14} /> },
//   ];

//   const handleCreateOrder = async () => {
//     if (!tableCart.length) return toast.error("Queue is empty.");
//     const result = await dispatch(
//       createOrderByAdminItself({
//         placeId: tableId,
//         items: tableCart.map((item) => ({
//           itemId: item._id,
//           size: item.selectedPrice.label,
//           quantity: item.quantity,
//         })),
//       })
//     );
//     if (result.meta.requestStatus === "fulfilled") {
//       clearTableCart();
//       toast.success("Order punched to kitchen!");
//     }
//   };

// const handleSettleAndPrint = async () => {
//   try {

//     if (!customerPhone || customerPhone.length !== 10) {
//       return toast.error("Please enter a valid phone number");
//     }

//     const snapshot = {
//       tableOrders,
//       tableId,
//       customerName,
//       customerPhone,
//       paymentMode,
//       subtotal,
//       tax,
//       grandTotal
//     };

//     setBillSnapshot(snapshot);

//     // PRINT FIRST
//     setTimeout(() => {
//       window.print();
//     }, 300);

//     // CLOSE SESSION AFTER
//     await dispatch(
//       closeSession({
//         placeId: tableId,
//         paymentMode,
//         customerName,
//         customerPhone
//       })
//     ).unwrap();

//     toast.success("Bill Settled");

//   } catch (err) {
//     toast.error("Failed to settle bill");
//   }
// };

//   return (
//     <div className="h-full flex flex-col bg-white border-l border-orange-100 overflow-hidden">
//       {/* SCREEN HEADER */}
//      <header className="px-4 py-3 bg-orange-950 text-white no-print">
//         <div className="flex justify-between items-center">
//           <div>
//             <div className="flex items-center gap-2">
//               <p className="text-2xl font-black italic uppercase tracking-tighter">
//                 Table {placeDetails?.number || "..."}
//               </p>
//               <span className="text-[10px] bg-orange-600 px-2 py-0.5 rounded-full font-bold uppercase">
//                 {placeDetails?.type || "Standard"}
//               </span>
//             </div>
//             <p className="text-[9px] font-bold text-orange-400 uppercase tracking-[0.2em]">
//               {placeDetails?.floor || "Main Hall"} • Capacity: {placeDetails?.capacity || 0}
//             </p>
//           </div>
//           <div className="bg-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-600/30">
//             <Receipt size={18} />
//           </div>
//         </div>
//       </header>

//       {/* SCREEN BODY */}
//       <main className="grow overflow-y-auto p-4 space-y-2 custom-scrollbar no-print bg-white">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center h-full text-orange-400">
//             <Loader className="animate-spin mb-4" size={32} />
//             <p className="font-black uppercase text-[10px] tracking-widest">Syncing Bill...</p>
//           </div>
//         ) : tableOrders.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full opacity-20">
//             <ShoppingCart size={48} className="mb-2" />
//             <p className="font-black uppercase text-xs tracking-widest">No Active Orders</p>
//           </div>
//         ) : (
//           <>
//             {/* CUSTOMER INFO INPUTS */}
//             <div className="mb-6 space-y-2 border-b border-orange-100 pb-4">
//                <div className="relative">
//                   <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
//                   <input 
//                     type="tel" 
//                     maxLength={10}
//                     placeholder="CUSTOMER PHONE (REQ)" 
//                     className="w-full pl-8 pr-3 py-2 bg-gray-50 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     value={customerPhone}
//                     onChange={(e) => setCustomerPhone(e.target.value)}
//                   />
//                </div>
//                <div className="relative">
//                   <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
//                   <input 
//                     type="text" 
//                     placeholder="CUSTOMER NAME (OPTIONAL)" 
//                     className="w-full pl-8 pr-3 py-2 bg-gray-50 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                   />
//                </div>
//             </div>

//             {tableOrders.map((order) => (
//               <div key={order._id} className="border-b border-orange-50 pb-2">
//                 <p className="text-[10px] text-gray-400 mb-3 font-black uppercase tracking-tighter">Ordered @ {new Date(order.createdAt).toLocaleTimeString()}</p>
//                 {order.items.map((item, i) => (
//                   <div key={i} className="flex justify-between items-center mb-2">
//                     <div className="flex items-center gap-3">
//                       <span className="h-6 w-6 flex items-center justify-center bg-orange-50 text-orange-600 font-black rounded text-[10px]">{item.quantity}</span>
//                       <div>
//                         <p className="font-bold text-orange-950 text-xs uppercase">{item.itemname}</p>
//                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{item.selectedSize}</p>
//                       </div>
//                     </div>
//                     <p className="font-black text-xs text-orange-950">₹{(item.price * item.quantity).toFixed(2)}</p>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </>
//         )}
//       </main>

//       {/* SCREEN FOOTER */}
//       <footer className="p-4 bg-white border-t-2 border-dashed border-orange-100 no-print">
//         {/* ... (Grand Total & Cart UI remain the same) ... */}
//         <div className="space-y-1 mb-4">
//           <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
//             <span>Subtotal</span>
//             <span className="text-orange-950">₹{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
//             <span>GST (18%)</span>
//             <span className="text-orange-950">₹{tax.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-2xl font-black text-orange-950 uppercase italic pt-2 border-t border-orange-50">
//             <span>Total</span>
//             <span className="text-orange-600 tracking-tighter">₹{grandTotal.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* PENDING CART UI */}
//         {tableCart.length > 0 && (
//           <div className="bg-black rounded-3xl p-5 mb-6 shadow-xl animate-in zoom-in-95 duration-200">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-2">
//                 <ShoppingCart size={16} className="text-orange-600" />
//                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Queue ({tableCart.length} Items)</span>
//               </div>
//               <button onClick={() => setIsCartOpen(!isCartOpen)} className="text-white/50">
//                 {isCartOpen ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
//               </button>
//             </div>
//             {isCartOpen && (
//               <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
//                 {tableCart.map((item) => (
//                   <div key={`${item._id}-${item.selectedPrice.label}`} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
//                     <div>
//                       <p className="text-[11px] font-bold text-white uppercase tracking-tight">{item.name}</p>
//                       <p className="text-[9px] text-orange-500 font-bold uppercase">{item.selectedPrice.label}</p>
//                     </div>
//                     <div className="flex items-center gap-3 text-white">
//                       <button onClick={() => removeFromTableCart(item._id, item.selectedPrice.label)} className="p-1 hover:text-orange-600 transition-colors"><Minus size={14}/></button>
//                       <span className="text-xs font-black">{item.quantity}</span>
//                       <button onClick={() => addToTableCart(item, item.selectedPrice)} className="p-1 hover:text-orange-600 transition-colors"><Plus size={14}/></button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <button onClick={handleCreateOrder} className="w-full bg-orange-600 text-white py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all">
//               Punch to Kitchen
//             </button>
//           </div>
//         )}

//         <div className="grid grid-cols-4 gap-2 mb-4">
//           {paymentOptions.map((opt) => (
//             <button
//               key={opt.name}
//               onClick={() => setPaymentMode(opt.name)}
//               className={`p-1 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
//                 paymentMode === opt.name ? "border-orange-600 bg-orange-50 text-orange-600 shadow-inner" : "border-transparent bg-gray-50 text-gray-400"
//               }`}
//             >
//               {opt.icon}
//               <span className="text-[9px] font-black uppercase tracking-widest">{opt.name}</span>
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={handleSettleAndPrint}
//           disabled={tableOrders.length === 0 || sessionClosing}
//           className="w-full bg-orange-950 hover:bg-orange-600 text-white py-4 rounded-[2rem] flex justify-center items-center gap-3 font-black uppercase tracking-widest text-xs transition-all active:scale-95 disabled:opacity-50"
//         >
//           {sessionClosing ? <Loader className="animate-spin" /> : <Printer />}
//           Finalize & Print
//         </button>
//       </footer>

//       {/* THERMAL BILL PRINT VERSION */}
//       <div id="thermal-bill-print">
//   <ThermalBill
//   tableOrders={billSnapshot?.tableOrders || []}
//   tableId={billSnapshot?.tableId}
//   customerName={billSnapshot?.customerName}
//   customerPhone={billSnapshot?.customerPhone}
//   paymentMode={billSnapshot?.paymentMode}
//   subtotal={billSnapshot?.subtotal || 0}
//   tax={billSnapshot?.tax || 0}
//   grandTotal={billSnapshot?.grandTotal || 0}
// />
// </div>

//     </div>
//   );
// };

// export default BillManagement;

