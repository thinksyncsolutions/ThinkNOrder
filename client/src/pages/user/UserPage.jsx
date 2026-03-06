import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ShoppingBag, Plus, Minus, X, ChevronRight, Utensils, Clock, Leaf } from "lucide-react";
import { fetchFullMenuForUser } from "../../redux/features/menu/menu.thunk";
import { createOrder } from "../../redux/features/order/order.thunk";
import { toast } from "react-hot-toast";
import { addToCart, removeFromCart } from "../../utils/cartUtils";

const UserPage = () => {
  const dispatch = useDispatch();
  const { placeCode } = useParams();
  const { sections, place, loading, error } = useSelector((state) => state.menu);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [variantModal, setVariantModal] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    if (placeCode) dispatch(fetchFullMenuForUser({ placeCode }));
  }, [dispatch, placeCode]);

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    const offset = 140; // Adjust based on your header height
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  const handleAdd = (item, selectedPrice) => {
    setCartItems((prev) => addToCart(prev, item, selectedPrice));
  };

  const handleRemove = (itemId, label) => {
    setCartItems((prev) => removeFromCart(prev, itemId, label));
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) return;
    const orderPayload = {
      restaurantId: place.restaurantId,
      branchId: place.branchId,
      placeId: place._id,
      items: cartItems.map((item) => ({
        itemId: item._id,
        size: item.selectedPrice.label,
        quantity: item.qty,
      })),
    };

    try {
      const resultAction = await dispatch(createOrder(orderPayload));
      if (createOrder.fulfilled.match(resultAction)) {
        toast.success("Chef is preparing your meal!", { icon: '👨‍🍳' });
        setCartItems([]);
        setIsCartOpen(false);
      }
    } catch (err) {
      toast.error("Ordering failed. Please call staff.");
    }
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.selectedPrice.price * item.qty, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin mb-4" />
      <p className="font-black uppercase tracking-widest text-xs text-orange-950">Preparing Menu</p>
    </div>
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-32">
      {/* ================= HEADER ================= */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-zinc-100">
        <div className="max-w-3xl mx-auto px-5 py-4">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h1 className="text-xl font-black text-black uppercase tracking-tighter">
                Think<span className="text-orange-600">N</span>Order
              </h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Digital Menu</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-orange-950 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-950/20">
                Table {place?.number}
              </span>
              <span className="text-[9px] font-bold text-orange-600 mt-1 uppercase italic">{place?.floor}</span>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
            {sections.map((section) => (
              <button
                key={section._id}
                onClick={() => scrollToSection(section._id)}
                className="whitespace-nowrap px-5 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-[11px] font-black uppercase tracking-wider text-zinc-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all active:scale-95"
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ================= MENU LIST ================= */}
      <main className="max-w-3xl mx-auto px-5 py-8 space-y-12">
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
                            <div className={`w-3 h-3 border-2 flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                               <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
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
                      {/* Image Placeholder - User experience is better with visuals */}
                      <div className="w-24 h-24 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-300 relative overflow-hidden border border-zinc-50 mb-2">
                        {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <Utensils size={28} />}
                        
                        {/* Add Button Overlayed on Image area */}
                        <div className="absolute -bottom-1">
                          {!totalQty ? (
                            <button
                              onClick={() => item.prices.length === 1 ? handleAdd(item, item.prices[0]) : setVariantModal(item)}
                              className="bg-white text-orange-600 px-6 py-1.5 rounded-xl border border-zinc-200 shadow-lg text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all active:scale-90"
                            >
                              Add
                            </button>
                          ) : (
                            <div className="bg-orange-600 text-white flex items-center px-2 py-1.5 rounded-xl shadow-lg border border-orange-700">
                              <button onClick={() => item.prices.length === 1 ? handleRemove(item._id, item.prices[0].label) : setIsCartOpen(true)} className="px-2">
                                <Minus size={12} strokeWidth={4} />
                              </button>
                              <span className="mx-2 text-xs font-black">{totalQty}</span>
                              <button onClick={() => item.prices.length === 1 ? handleAdd(item, item.prices[0]) : setVariantModal(item)} className="px-2">
                                <Plus size={12} strokeWidth={4} />
                              </button>
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
      </main>

      {/* ================= VARIANT MODAL ================= */}
      {variantModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 md:p-6">
          <div className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm" onClick={() => setVariantModal(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-4">
              <div>
                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Customise</p>
                <h3 className="font-black text-xl text-orange-950 uppercase tracking-tight">{variantModal.name}</h3>
              </div>
              <button onClick={() => setVariantModal(null)} className="p-2 bg-zinc-100 rounded-full text-zinc-500">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {variantModal.prices.map((price, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleAdd(variantModal, price);
                    setVariantModal(null);
                  }}
                  className="w-full bg-white border-2 border-zinc-100 p-5 rounded-2xl flex justify-between items-center hover:border-orange-600 transition-all active:scale-[0.98] group"
                >
                  <span className="capitalize font-black text-zinc-600 group-hover:text-orange-950">{price.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-600 font-black">₹{price.price}</span>
                    <Plus size={18} className="text-zinc-300 group-hover:text-orange-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING CART BAR ================= */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-orange-600 text-white p-5 rounded-[2rem] shadow-2xl shadow-orange-600/40 flex items-center justify-between group active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-xl">
                 <ShoppingBag size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-100">{cartCount} Item{cartCount > 1 ? 's' : ''} added</p>
                <p className="text-lg font-black leading-none italic uppercase tracking-tighter">₹{cartTotal}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 font-black text-sm uppercase tracking-tighter">
              View Order <ChevronRight size={18} />
            </div>
          </button>
        </div>
      )}

      {/* ================= CART SIDEBAR ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <div className="absolute inset-0 bg-orange-950/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="font-black text-2xl text-orange-950 uppercase tracking-tighter italic">Review <span className="text-orange-600">Order</span></h2>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Table {place?.number} • {place?.floor}</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-orange-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.selectedPrice.label}`} className="flex justify-between items-center bg-zinc-50/50 p-4 rounded-3xl border border-zinc-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-black text-xs">
                      {item.qty}x
                    </div>
                    <div>
                      <p className="font-black text-orange-950 uppercase text-xs tracking-tight">{item.name}</p>
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{item.selectedPrice.label} • ₹{item.selectedPrice.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white border border-zinc-200 p-1 rounded-xl shadow-sm">
                    <button onClick={() => handleRemove(item._id, item.selectedPrice.label)} className="p-1 text-zinc-400 hover:text-orange-600"><Minus size={14} /></button>
                    <span className="text-xs font-black text-orange-950">{item.qty}</span>
                    <button onClick={() => handleAdd(item, item.selectedPrice)} className="p-1 text-zinc-400 hover:text-orange-600"><Plus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t-2 border-dashed border-zinc-100 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-orange-950 uppercase tracking-tighter italic">
                  <span>Total Amount</span>
                  <span className="text-orange-600 text-2xl tracking-tight">₹{cartTotal}</span>
                </div>
              </div>
              
              <button onClick={handleSubmitOrder} className="w-full bg-orange-950 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-orange-950/20 hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                Send to Kitchen <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;