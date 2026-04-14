import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  ChevronRight,
  Utensils,
  Clock,
  User,
} from "lucide-react";
import { fetchFullMenuForUser } from "../../redux/features/menu/menu.thunk";
import { createOrder } from "../../redux/features/order/order.thunk";
import { toast } from "react-hot-toast";
import { addToCart, removeFromCart } from "../../utils/cartUtils";
import { io } from "socket.io-client";
import UserCart from "./UserCart";
import UserOrderCard from "./UserOrderCard";
import Loader from "../../components/common/Loader";

const socketURL = import.meta.env.VITE_SOCKET_URL;

const UserPage = () => {
  const dispatch = useDispatch();
  const { placeCode } = useParams();
  const { sections, place, orders, loading } = useSelector((state) => state.menu);

  const socketRef = useRef(null);

  const [activeTab, setActiveTab] = useState("menu");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [variantModal, setVariantModal] = useState(null);
  const sectionRefs = useRef({});

  // 🔥 FETCH MENU
  useEffect(() => {
    if (placeCode) dispatch(fetchFullMenuForUser({ placeCode }));
  }, [dispatch, placeCode]);

  // 🔥 INIT SOCKET (ONLY ONCE)
  useEffect(() => {
    socketRef.current = io(socketURL, {
      transports: ["websocket"],
    });

    socketRef.current.connect();

    console.log("✅ Socket Connected");

    return () => {
      socketRef.current.disconnect();
      console.log("❌ Socket Disconnected");
    };
  }, []);

  // 🔥 JOIN ROOM + LISTEN EVENTS
  useEffect(() => {
    if (!place?.restaurantId || !place?.branchId) return;

    const socket = socketRef.current;

    socket.emit("joinRoom", place.restaurantId, place.branchId);
    console.log(`✅ Joined room: restaurant:${place.restaurantId}:branch:${place.branchId}`);

    // 🔥 ORDER STATUS UPDATE
    socket.on("orderStatusChanged", (data) => {
      // console.log("🔥 Status Update:", data);
      dispatch(fetchFullMenuForUser({ placeCode })); // Refresh menu & orders
      toast.success("Your order is " + data.status, { icon: "🔔" });
    });

    // 🔥 NEW ORDER
    socket.on("newOrder", () => {
      dispatch(fetchFullMenuForUser({ placeCode })); // Refresh menu & orders
      console.log("🆕 New Order");
    });

    return () => {
      socket.off("orderStatusChanged");
      socket.off("newOrder");
    };
  }, [place?.restaurantId, place?.branchId, dispatch, placeCode]);

  // 🔥 CALL WAITER
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
    const offset = 140;
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

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.selectedPrice.price * item.qty,
    0
  );

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  if (loading)
    return (
      <Loader message="Loading Menu..." />
    );

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-32">
      {/* ================= HEADER ================= */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-5 py-4">
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 flex items-center justify-center shrink-0 shadow-sm">
                {place?.restaurantLogo ? (
                  <img src={place.restaurantLogo} alt="logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-black text-zinc-500">{place?.restaurantName?.charAt(0) || "R"}</span>
                )}
              </div>
              <div className="truncate">
                <h1 className="text-base font-black text-black leading-tight truncate">{place?.restaurantName || "Restaurant"}</h1>
                <p className="text-xs font-bold text-orange-600 truncate flex items-center gap-2">
                  {place?.branchName || "Branch"}
                  <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-[2px] rounded-full ${place?.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    <span className={`w-2 h-2 rounded-full ${place?.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                    {place?.isOpen ? "OPEN" : "CLOSED"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button onClick={handleCallWaiter} className="flex flex-col items-center justify-center bg-orange-50 border border-orange-100 px-3 py-2 rounded-2xl active:scale-90 transition-all group">
                <div className="text-orange-600 group-hover:animate-bounce"><Utensils size={16} strokeWidth={3} /></div>
                <span className="text-[8px] font-black uppercase text-orange-950 mt-1 tracking-tighter">Call Waiter</span>
              </button>
              <div className="flex flex-col items-end border-l border-zinc-100 pl-3">
                <span className="bg-orange-950 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">Table {place?.number || "-"}</span>
                <span className="text-[9px] font-bold text-orange-600 mt-1 uppercase italic">{place?.floor || ""}</span>
              </div>
            </div>
          </div>

          {/* 🔥 TABS EXPLORE */}
          <div className="flex bg-zinc-100 p-1 rounded-2xl mb-4">
            <button 
              onClick={() => setActiveTab("menu")}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'menu' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-400'}`}
            >
              Explore Menu
            </button>
            <button 
              onClick={() => setActiveTab("orders")}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'orders' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-400'}`}
            >
              Orders
              {orders?.length > 0 && <span className="absolute top-2 right-4 w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping" />}
            </button>
          </div>

          {activeTab === "menu" && (
            <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
              {sections.map((section) => (
                <button key={section._id} onClick={() => scrollToSection(section._id)} className="whitespace-nowrap px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-black uppercase tracking-wider text-zinc-600 hover:bg-orange-600 hover:text-white transition-all">
                  {section.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-3xl mx-auto px-5 py-8">
        {activeTab === "menu" ? (
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section._id} ref={(el) => (sectionRefs.current[section._id] = el)}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-sm font-black text-orange-950 uppercase tracking-[0.2em]">{section.name}</h2>
                  <div className="h-[1px] flex-1 bg-zinc-200" />
                </div>
                <div className="space-y-4">
                  {section.items?.map((item) => {
                    const itemInCart = cartItems.filter((i) => i._id === item._id);
                    const totalQty = itemInCart.reduce((acc, i) => acc + i.qty, 0);
                    return (
                      <div key={item._id} className="bg-white p-5 rounded-[2rem] border border-zinc-100 flex justify-between items-start shadow-sm transition-all active:bg-zinc-50">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            {item.isVeg !== undefined && (
                              <div className={`w-3 h-3 border-2 flex items-center justify-center ${item.isVeg ? "border-green-600" : "border-red-600"}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                              </div>
                            )}
                            <h3 className="font-black text-orange-950 uppercase text-sm tracking-tight leading-tight">{item.name}</h3>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{item.description}</p>
                          <div className="flex flex-wrap gap-3">
                            {item.prices.map((p, i) => (
                              <div key={i} className="text-[11px] font-black">
                                <span className="text-zinc-400 uppercase tracking-tighter mr-1">{p.label !== "default" ? p.label : "Price"}</span>
                                <span className="text-orange-600">₹{p.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-24 h-24 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-300 relative overflow-hidden border border-zinc-50 mb-2">
                            {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <Utensils size={28} />}
                            <div className="absolute -bottom-1">
                              {!totalQty ? (
                                <button onClick={() => item.prices.length === 1 ? handleAdd(item, item.prices[0]) : setVariantModal(item)} className="bg-white text-orange-600 px-6 py-1.5 rounded-xl border border-zinc-200 shadow-lg text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">Add</button>
                              ) : (
                                <div className="bg-orange-600 text-white flex items-center px-2 py-1.5 rounded-xl shadow-lg border border-orange-700">
                                  <button onClick={() => item.prices.length === 1 ? handleRemove(item._id, item.prices[0].label) : setIsCartOpen(true)} className="px-2"><Minus size={12} strokeWidth={4} /></button>
                                  <span className="mx-2 text-xs font-black">{totalQty}</span>
                                  <button onClick={() => item.prices.length === 1 ? handleAdd(item, item.prices[0]) : setVariantModal(item)} className="px-2"><Plus size={12} strokeWidth={4} /></button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 🔥 ORDERS TAB */
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-black text-orange-950 uppercase tracking-[0.2em]">Order History</h2>
              <Clock size={16} className="text-zinc-400" />
            </div>
            {orders?.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-zinc-100">
                <ShoppingBag size={48} className="mx-auto text-zinc-200 mb-4" />
                <p className="text-zinc-400 font-bold text-sm">No orders yet.</p>
              </div>
            ) : (
              [...orders].reverse().map((order) => <UserOrderCard key={order._id} order={order} />)
            )}
          </div>
        )}
      </main>

      {/* ================= MODALS & CART ================= */}
      {variantModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm" onClick={() => setVariantModal(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-4">
              <div><p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Customise</p>
              <h3 className="font-black text-xl text-orange-950 uppercase tracking-tight">{variantModal.name}</h3></div>
              <button onClick={() => setVariantModal(null)} className="p-2 bg-zinc-100 rounded-full text-zinc-500"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              {variantModal.prices.map((price, i) => (
                <button key={i} onClick={() => { handleAdd(variantModal, price); setVariantModal(null); }} className="w-full bg-white border-2 border-zinc-100 p-5 rounded-2xl flex justify-between items-center hover:border-orange-600 transition-all active:scale-[0.98] group">
                  <span className="capitalize font-black text-zinc-600 group-hover:text-orange-950">{price.label}</span>
                  <div className="flex items-center gap-3"><span className="text-orange-600 font-black">₹{price.price}</span><Plus size={18} className="text-zinc-300 group-hover:text-orange-600" /></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {cartCount > 0 && activeTab === "menu" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
          <button onClick={() => setIsCartOpen(true)} className="w-full bg-orange-600 text-white p-5 rounded-[2rem] shadow-2xl flex items-center justify-between group active:scale-95 transition-transform">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-xl"><ShoppingBag size={20} /></div>
              <div className="text-left"><p className="text-[10px] font-black uppercase tracking-widest text-orange-100">{cartCount} Items added</p>
              <p className="text-lg font-black leading-none italic uppercase tracking-tighter">₹{cartTotal}</p></div>
            </div>
            <div className="flex items-center gap-1 font-black text-sm uppercase tracking-tighter">View Order <ChevronRight size={18} /></div>
          </button>
        </div>
      )}

      {/* 3. New Refactored Cart Component */}
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