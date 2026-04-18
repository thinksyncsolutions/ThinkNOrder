import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  Minus,
  Search,
  ShoppingCart,
  Clock,
  MapPin,
  Home,
  User,
  UtensilsCrossed,
  Star,
  ChevronDown,
  Utensils
} from "lucide-react";
import { fetchFullMenuForUser } from "../../redux/features/menu/menu.thunk";
import { createOrder } from "../../redux/features/order/order.thunk";
import { toast } from "react-hot-toast";
import { addToCart, removeFromCart } from "../../utils/cartUtils";
import { io } from "socket.io-client";
import UserCart from "./UserCart";
import UserOrderCard from "./UserOrderCard";
import Loader from "../../components/common/Loader";
import VariantModal from "./VariantModal";
import UserNavbar from "./UserNavbar";
import UserHeader from "./UserHeader";

const socketURL = import.meta.env.VITE_SOCKET_URL;

const UserPage = () => {
  const dispatch = useDispatch();
  const { placeCode } = useParams();
  const { sections, place, orders, loading } = useSelector((state) => state.menu);

  const socketRef = useRef(null);
  const sectionRefs = useRef({});

  const [activeTab, setActiveTab] = useState("home");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [variantModal, setVariantModal] = useState(null);

  // 🔥 RESTORED: FETCH MENU
  useEffect(() => {
    if (placeCode) dispatch(fetchFullMenuForUser({ placeCode }));
  }, [dispatch, placeCode]);

  // 🔥 RESTORED: INIT SOCKET
  useEffect(() => {
    socketRef.current = io(socketURL, { transports: ["websocket"] });
    socketRef.current.connect();
    return () => socketRef.current.disconnect();
  }, []);

  // 🔥 RESTORED: JOIN ROOM + LISTEN EVENTS
  useEffect(() => {
    if (!place?.restaurantId || !place?.branchId) return;
    const socket = socketRef.current;
    socket.emit("joinRoom", place.restaurantId, place.branchId);

    socket.on("orderStatusChanged", (data) => {
      dispatch(fetchFullMenuForUser({ placeCode }));
      toast.success("Your order is " + data.status, { icon: "🔔" });
    });

    socket.on("newOrder", () => {
      dispatch(fetchFullMenuForUser({ placeCode }));
    });

    return () => {
      socket.off("orderStatusChanged");
      socket.off("newOrder");
    };
  }, [place?.restaurantId, place?.branchId, dispatch, placeCode]);

  // 🔥 RESTORED: CALL WAITER
  const handleCallWaiter = () => {
    if (!place) return toast.error("Table info missing");
    socketRef.current.emit("callWaiter", {
      restaurantId: place.restaurantId,
      branchId: place.branchId,
      tableNumber: place.number,
      floorName: place.floor,
      tableType: place.type,
    });
    toast.success("Waiter notified!", { icon: "🔔" });
  };

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const offsetPosition = elementRect - bodyRect - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const handleAdd = (item, selectedPrice) => {
    setCartItems((prev) => addToCart(prev, item, selectedPrice));
  };

  const handleRemove = (itemId, label) => {
    setCartItems((prev) => removeFromCart(prev, itemId, label));
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) return;
    const payload = {
      restaurantId: place.restaurantId,
      branchId: place.branchId,
      placeId: place._id,
      items: cartItems.map((item) => ({
        itemId: item._id,
        size: item.selectedPrice.label,
        quantity: item.qty,
        price: item.selectedPrice.price,
        name: item.name,
      })),
    };

    const result = await dispatch(createOrder(payload));
    if (createOrder.fulfilled.match(result)) {
      toast.success("Chef is preparing your meal!", { icon: "👨‍🍳" });
      setCartItems([]);
      setIsCartOpen(false);
      setActiveTab("orders");
    }
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.selectedPrice.price * item.qty, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  if (loading) return <Loader message="Loading Menu..." />;

  return (
    <div className="bg-[#F8F5F2] min-h-screen pb-32">
      
      {/* 1. HEADER (Image Style) */}
      <UserHeader 
        place={place} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      {/* 2. FILTER PILLS */}
      <div className="flex gap-3 px-6 py-4 overflow-x-auto no-scrollbar">
        <button onClick={handleCallWaiter} className="whitespace-nowrap bg-white px-5 py-2.5 rounded-full text-sm font-bold border border-orange-100 text-orange-600 shadow-sm flex items-center gap-2 active:scale-95">
          <Utensils size={14} /> Call Waiter
        </button>
        {["Pickup", "Under 30 min", "Price"].map((filter) => (
          <button key={filter} className="whitespace-nowrap bg-white px-5 py-2.5 rounded-full text-sm font-medium border border-slate-100 shadow-sm">
            {filter}
          </button>
        ))}
      </div>

      {/* 3. PROMO BANNER */}
      <section className="px-6 py-4">
        <div className="bg-[#212121] rounded-[2.5rem] p-8 relative overflow-hidden h-52 flex flex-col justify-center">
          <div className="relative z-10 w-3/5">
            <h2 className="text-white text-2xl font-bold leading-tight mb-1">Free delivery for spaghetti</h2>
            <p className="text-slate-400 text-xs mb-4">Up to 3 times per day</p>
            <button className="bg-[#FFB800] text-black px-6 py-2.5 rounded-full text-xs font-black shadow-lg">
              Order now
            </button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000&auto=format&fit=crop" 
            alt="promo" 
            className="absolute -right-8 -bottom-8 w-60 h-60 object-cover rounded-full rotate-12"
          />
        </div>
      </section>

      {/* 4. CIRCULAR CATEGORIES (RESTORED SCROLL LOGIC) */}
      <section className="px-6 py-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-6">
          {sections.map((section) => (
            <button 
                key={section._id} 
                onClick={() => scrollToSection(section._id)}
                className="flex flex-col items-center gap-3 shrink-0 group"
            >
              <div className="w-16 h-16 bg-white rounded-full p-2 shadow-md border border-slate-50 flex items-center justify-center overflow-hidden group-active:scale-90 transition-transform">
                <img src={section.image || "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"} className="w-10 h-10 object-contain rounded-full" alt={section.name} />
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">{section.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 5. MENU ITEMS (RESTORED MAP LOGIC) */}
      <main className="px-6 space-y-12">
        {activeTab === "home" || activeTab === "menu" ? (
          sections.map((section) => (
            <div key={section._id} ref={(el) => (sectionRefs.current[section._id] = el)}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-slate-900">{section.name}</h2>
                <button className="text-orange-500 text-xs font-bold">See all</button>
              </div>
              
              <div className="space-y-4">
                {section.items?.map((item) => {
                    const itemInCart = cartItems.filter((i) => i._id === item._id);
                    const totalQty = itemInCart.reduce((acc, i) => acc + i.qty, 0);
                    return (
                        <div key={item._id} className="bg-white rounded-[2rem] p-4 flex items-center gap-4 shadow-sm border border-slate-50">
                            <div className="w-24 h-24 bg-[#F3F3F3] rounded-2xl overflow-hidden shrink-0">
                                <img src={item.image || "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-base truncate">{item.name}</h3>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-bold text-slate-400">4.5</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                                    <Clock size={12} /> 24 min • 500Km
                                </div>
                                <div className="flex justify-between items-end mt-3">
                                    <span className="text-lg font-black">${item.prices[0].price}</span>
                                    <button 
                                        onClick={() => item.prices.length === 1 ? handleAdd(item, item.prices[0]) : setVariantModal(item)}
                                        className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center shadow-lg active:scale-90"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
              </div>
            </div>
          ))
        ) : (
          /* 🔥 RESTORED ORDERS TAB */
          <div className="space-y-6 pt-4">
            <h2 className="text-lg font-black">Order History</h2>
            {orders?.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-zinc-200">
                    <p className="text-zinc-400 font-bold text-sm">No orders yet.</p>
                </div>
            ) : (
                [...orders].reverse().map((order) => <UserOrderCard key={order._id} order={order} />)
            )}
          </div>
        )}
      </main>

      {/* 6. FLOATING YELLOW NAV BAR */}
      <UserNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setIsCartOpen={setIsCartOpen}
        cartCount={cartCount} 
      />

      {/* MODALS */}
      <VariantModal item={variantModal} onClose={() => setVariantModal(null)} onAdd={handleAdd} />
      <UserCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        cartTotal={cartTotal} 
        place={place}
        onAdd={handleAdd} 
        onRemove={handleRemove} 
        onSubmit={handleSubmitOrder}
      />
    </div>
  );
};

export default UserPage;

// import React, { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   ShoppingBag,
//   Plus,
//   Minus,
//   X,
//   ChevronRight,
//   Utensils,
//   Clock,
//   User,
// } from "lucide-react";
// import { fetchFullMenuForUser } from "../../redux/features/menu/menu.thunk";
// import { createOrder } from "../../redux/features/order/order.thunk";
// import { toast } from "react-hot-toast";
// import { addToCart, removeFromCart } from "../../utils/cartUtils";
// import { io } from "socket.io-client";
// import UserCart from "./UserCart";
// import UserOrderCard from "./UserOrderCard";
// import Loader from "../../components/common/Loader";
// import VariantModal from "./VariantModal";

// const socketURL = import.meta.env.VITE_SOCKET_URL;

// const UserPage = () => {
//   const dispatch = useDispatch();
//   const { placeCode } = useParams();
//   const { sections, place, orders, loading } = useSelector((state) => state.menu);

//   const socketRef = useRef(null);

//   const [activeTab, setActiveTab] = useState("menu");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [variantModal, setVariantModal] = useState(null);
//   const sectionRefs = useRef({});

//   // 🔥 FETCH MENU
//   useEffect(() => {
//     if (placeCode) dispatch(fetchFullMenuForUser({ placeCode }));
//   }, [dispatch, placeCode]);

//   // 🔥 INIT SOCKET (ONLY ONCE)
//   useEffect(() => {
//     socketRef.current = io(socketURL, {
//       transports: ["websocket"],
//     });

//     socketRef.current.connect();

//     console.log("✅ Socket Connected");

//     return () => {
//       socketRef.current.disconnect();
//       console.log("❌ Socket Disconnected");
//     };
//   }, []);

//   // 🔥 JOIN ROOM + LISTEN EVENTS
//   useEffect(() => {
//     if (!place?.restaurantId || !place?.branchId) return;

//     const socket = socketRef.current;

//     socket.emit("joinRoom", place.restaurantId, place.branchId);
//     console.log(`✅ Joined room: restaurant:${place.restaurantId}:branch:${place.branchId}`);

//     // 🔥 ORDER STATUS UPDATE
//     socket.on("orderStatusChanged", (data) => {
//       // console.log("🔥 Status Update:", data);
//       dispatch(fetchFullMenuForUser({ placeCode })); // Refresh menu & orders
//       toast.success("Your order is " + data.status, { icon: "🔔" });
//     });

//     // 🔥 NEW ORDER
//     socket.on("newOrder", () => {
//       dispatch(fetchFullMenuForUser({ placeCode })); // Refresh menu & orders
//       console.log("🆕 New Order");
//     });

//     return () => {
//       socket.off("orderStatusChanged");
//       socket.off("newOrder");
//     };
//   }, [place?.restaurantId, place?.branchId, dispatch, placeCode]);

//   // 🔥 CALL WAITER
//   const handleCallWaiter = () => {
//     if (!place) return toast.error("Table info missing");

//     socketRef.current.emit("callWaiter", {
//       restaurantId: place.restaurantId,
//       branchId: place.branchId,
//       tableNumber: place.number,
//       floorName: place.floor,
//       tableType: place.type,
//     });

//     toast.success("Waiter notified!", { icon: "🔔" });
//   };

//   const scrollToSection = (id) => {
//     const element = sectionRefs.current[id];
//     const offset = 140;
//     const bodyRect = document.body.getBoundingClientRect().top;
//     const elementRect = element.getBoundingClientRect().top;
//     const offsetPosition = elementRect - bodyRect - offset;
//     window.scrollTo({ top: offsetPosition, behavior: "smooth" });
//   };

//   const handleAdd = (item, selectedPrice) => {
//     setCartItems((prev) => addToCart(prev, item, selectedPrice));
//   };

//   const handleRemove = (itemId, label) => {
//     setCartItems((prev) => removeFromCart(prev, itemId, label));
//   };

//   const handleSubmitOrder = async () => {
//     if (cartItems.length === 0) return;

//     const payload = {
//       restaurantId: place.restaurantId,
//       branchId: place.branchId,
//       placeId: place._id,
//       items: cartItems.map((item) => ({
//         itemId: item._id,
//         size: item.selectedPrice.label,
//         quantity: item.qty,
//         price: item.selectedPrice.price,
//         name: item.name,
//       })),
//     };

//     const result = await dispatch(createOrder(payload));

//     if (createOrder.fulfilled.match(result)) {
//       toast.success("Chef is preparing your meal!", { icon: "👨‍🍳" });
//       setCartItems([]);
//       setIsCartOpen(false);
//       setActiveTab("orders");
//     }
//   };

//   const cartTotal = cartItems.reduce(
//     (acc, item) => acc + item.selectedPrice.price * item.qty,
//     0
//   );

//   const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

//   if (loading)
//     return (
//       <Loader message="Loading Menu..." />
//     );

//   return (
//     <div className="bg-[#FAFAFA] min-h-screen pb-32">
//       {/* ================= HEADER ================= */}
//       <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-zinc-100">
//         <div className="max-w-3xl mx-auto px-5 py-4">
//           <div className="flex justify-between items-start gap-3 mb-4">
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 flex items-center justify-center shrink-0 shadow-sm">
//                 {place?.restaurantLogo ? (
//                   <img src={place.restaurantLogo} alt="logo" className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-sm font-black text-zinc-500">{place?.restaurantName?.charAt(0) || "R"}</span>
//                 )}
//               </div>
//               <div className="truncate">
//                 <h1 className="text-base font-black text-black leading-tight truncate">{place?.restaurantName || "Restaurant"}</h1>
//                 <p className="text-xs font-bold text-orange-600 truncate flex items-center gap-2">
//                   {place?.branchName || "Branch"}
//                   <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-[2px] rounded-full ${place?.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
//                     <span className={`w-2 h-2 rounded-full ${place?.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
//                     {place?.isOpen ? "OPEN" : "CLOSED"}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 shrink-0">
//               <button onClick={handleCallWaiter} className="flex flex-col items-center justify-center bg-orange-50 border border-orange-100 px-3 py-2 rounded-2xl active:scale-90 transition-all group">
//                 <div className="text-orange-600 group-hover:animate-bounce"><Utensils size={16} strokeWidth={3} /></div>
//                 <span className="text-[8px] font-black uppercase text-orange-950 mt-1 tracking-tighter">Call Waiter</span>
//               </button>
//               <div className="flex flex-col items-end border-l border-zinc-100 pl-3">
//                 <span className="bg-orange-950 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">Table {place?.number || "-"}</span>
//                 <span className="text-[9px] font-bold text-orange-600 mt-1 uppercase italic">{place?.floor || ""}</span>
//               </div>
//             </div>
//           </div>

//           {/* 🔥 TABS EXPLORE */}
//           <div className="flex bg-zinc-100 p-1 rounded-2xl mb-4">
//             <button 
//               onClick={() => setActiveTab("menu")}
//               className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'menu' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-400'}`}
//             >
//               Explore Menu
//             </button>
//             <button 
//               onClick={() => setActiveTab("orders")}
//               className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'orders' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-400'}`}
//             >
//               Orders
//               {orders?.length > 0 && <span className="absolute top-2 right-4 w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping" />}
//             </button>
//           </div>

//           {activeTab === "menu" && (
//             <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
//               {sections.map((section) => (
//                 <button key={section._id} onClick={() => scrollToSection(section._id)} className="whitespace-nowrap px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-black uppercase tracking-wider text-zinc-600 hover:bg-orange-600 hover:text-white transition-all">
//                   {section.name}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </header>

//       {/* ================= MAIN CONTENT ================= */}
//       <main className="max-w-3xl mx-auto px-5 py-8">
//         {activeTab === "menu" ? (
//           <div className="space-y-12">
//             {sections.map((section) => (
//               <div key={section._id} ref={(el) => (sectionRefs.current[section._id] = el)}>
//                 <div className="flex items-center gap-3 mb-6">
//                   <h2 className="text-sm font-black text-orange-950 uppercase tracking-[0.2em]">{section.name}</h2>
//                   <div className="h-[1px] flex-1 bg-zinc-200" />
//                 </div>
//                 <div className="space-y-4">
//                   {section.items?.map((item) => {
//                     const itemInCart = cartItems.filter((i) => i._id === item._id);
//                     const totalQty = itemInCart.reduce((acc, i) => acc + i.qty, 0);
//                     return (
//                       <div key={item._id} className="bg-white p-5 rounded-[2rem] border border-zinc-100 flex justify-between items-start shadow-sm transition-all active:bg-zinc-50">
//                         <div className="flex-1 pr-4">
//                           <div className="flex items-center gap-2 mb-1">
//                             {item.isVeg !== undefined && (
//                               <div className={`w-3 h-3 border-2 flex items-center justify-center ${item.isVeg ? "border-green-600" : "border-red-600"}`}>
//                                 <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
//                               </div>
//                             )}
//                             <h3 className="font-black text-orange-950 uppercase text-sm tracking-tight leading-tight">{item.name}</h3>
//                           </div>
//                           <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{item.description}</p>
//                           <div className="flex flex-wrap gap-3">
//                             {item.prices.map((p, i) => (
//                               <div key={i} className="text-[11px] font-black">
//                                 <span className="text-zinc-400 uppercase tracking-tighter mr-1">{p.label !== "default" ? p.label : "Price"}</span>
//                                 <span className="text-orange-600">₹{p.price}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-center gap-2">
//                           <div className="w-24 h-24 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-300 relative overflow-hidden border border-zinc-50 mb-2">
//                             {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <Utensils size={28} />}
//                             <div className="absolute -bottom-1">
//                               {!totalQty ? (
//                                 <button onClick={() => item.prices.length === 1 ? handleAdd(item, item.prices[0]) : setVariantModal(item)} className="bg-white text-orange-600 px-6 py-1.5 rounded-xl border border-zinc-200 shadow-lg text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">Add</button>
//                               ) : (
//                                 <div className="bg-orange-600 text-white flex items-center px-2 py-1.5 rounded-xl shadow-lg border border-orange-700">
//                                   <button onClick={() => item.prices.length === 1 ? handleRemove(item._id, item.prices[0].label) : setIsCartOpen(true)} className="px-2"><Minus size={12} strokeWidth={4} /></button>
//                                   <span className="mx-2 text-xs font-black">{totalQty}</span>
//                                   <button onClick={() => item.prices.length === 1 ? handleAdd(item, item.prices[0]) : setVariantModal(item)} className="px-2"><Plus size={12} strokeWidth={4} /></button>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           /* 🔥 ORDERS TAB */
//           <div className="space-y-6">
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-sm font-black text-orange-950 uppercase tracking-[0.2em]">Order History</h2>
//               <Clock size={16} className="text-zinc-400" />
//             </div>
//             {orders?.length === 0 ? (
//               <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-zinc-100">
//                 <ShoppingBag size={48} className="mx-auto text-zinc-200 mb-4" />
//                 <p className="text-zinc-400 font-bold text-sm">No orders yet.</p>
//               </div>
//             ) : (
//               [...orders].reverse().map((order) => <UserOrderCard key={order._id} order={order} />)
//             )}
//           </div>
//         )}
//       </main>

//       {/* ================= MODALS & CART ================= */}
//      <VariantModal 
//         item={variantModal} 
//         onClose={() => setVariantModal(null)} 
//         onAdd={handleAdd} 
//       />

//       {cartCount > 0 && activeTab === "menu" && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
//           <button onClick={() => setIsCartOpen(true)} className="w-full bg-orange-600 text-white p-5 rounded-[2rem] shadow-2xl flex items-center justify-between group active:scale-95 transition-transform">
//             <div className="flex items-center gap-4">
//               <div className="bg-white/20 p-2 rounded-xl"><ShoppingBag size={20} /></div>
//               <div className="text-left"><p className="text-[10px] font-black uppercase tracking-widest text-orange-100">{cartCount} Items added</p>
//               <p className="text-lg font-black leading-none italic uppercase tracking-tighter">₹{cartTotal}</p></div>
//             </div>
//             <div className="flex items-center gap-1 font-black text-sm uppercase tracking-tighter">View Order <ChevronRight size={18} /></div>
//           </button>
//         </div>
//       )}

//       {/* 3. New Refactored Cart Component */}
//       <UserCart 
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         cartItems={cartItems}
//         cartTotal={cartTotal}
//         place={place}
//         onAdd={handleAdd}
//         onRemove={handleRemove}
//         onSubmit={handleSubmitOrder}
//       />
//     </div>
//   );
// };

// export default UserPage;