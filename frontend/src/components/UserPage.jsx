// import React from "react";
// import { useState, useEffect, useMemo } from "react";
// import {
//   Clock,
//   ShoppingCart,
//   Plus,
//   Minus,
//   X,
//   ChefHat,
//   UtensilsCrossed,
// } from "lucide-react";
// import axios from "axios";
// import { Toaster, toast } from "react-hot-toast";
// import { useParams } from "react-router-dom";

// const baseURL = import.meta.env.VITE_API_BASE_URL;

// const RestaurantMenu = () => {
//   const { restaurantId, placeId, floor, table } = useParams();
//   const [menu, setMenu] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSection, setSelectedSection] = useState(0);
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(false);

//   // --- All your existing useEffect and handler functions remain exactly the same ---
//   // Fetch menu
//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const res = await axios.get(
//           `${baseURL}/user/getMenuForUser/${restaurantId}`
//         );
//         setMenu(res.data);
//       } catch (error) {
//         console.error("Error fetching menu:", error);
//         setMenu(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMenu();
//   }, [restaurantId]);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const storedCart = localStorage.getItem(`cart_${restaurantId}`);
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, [restaurantId]);

//   // Store cart in localStorage on change
//   useEffect(() => {
//     localStorage.setItem(`cart_${restaurantId}`, JSON.stringify(cart));
//   }, [cart, restaurantId, placeId]);

//   const addToCart = (item, size) => {
//     setCart((prev) => {
//       const existingIndex = prev.findIndex(
//         (e) => e.itemId === item._id && e.size === size
//       );
//       if (existingIndex !== -1) {
//         const updated = [...prev];
//         updated[existingIndex].quantity += 1;
//         return updated;
//       }
//       return [...prev, { itemId: item._id, size, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (itemId, size) => {
//     setCart((prev) => {
//       const existingIndex = prev.findIndex(
//         (e) => e.itemId === itemId && e.size === size
//       );
//       if (existingIndex !== -1) {
//         const updated = [...prev];
//         if (updated[existingIndex].quantity > 1) {
//           updated[existingIndex].quantity -= 1;
//         } else {
//           updated.splice(existingIndex, 1);
//         }
//         return updated;
//       }
//       return prev;
//     });
//   };

//   const cartTotal = useMemo(() => {
//     if (!menu?.sections) return 0;
//     return cart.reduce((total, { itemId, size, quantity }) => {
//       const item = menu.sections
//         .flatMap((sec) => sec.items)
//         .find((i) => i._id === itemId);
//       const price =
//         item?.prices?.find((p) => p.size.toLowerCase() === size)?.price || 0;
//       return total + price * quantity;
//     }, 0);
//   }, [cart, menu]);

//   const createOrder = async () => {
//     try {
//       const response = await axios.post(`${baseURL}/order/create-order`, {
//         items: cart,
//         placeId,
//         restaurantId,
//       });

//       if (response.status === 201) {
//         toast.success("Order Placed Successfully");
//         setCart([]);
//         localStorage.removeItem(`cart_${restaurantId}`);
//         setShowCart(false);
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error?.response?.data?.message || "Failed to place order");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-xl font-semibold text-zinc-700">
//         <ChefHat className="text-orange-500 h-16 w-16 animate-pulse" />
//         <p className="mt-4">Loading the Tastiest Menu...</p>
//       </div>
//     );
//   }

//   if (!menu?.sections || menu.sections.length === 0) {
//     return (
//       <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-lg text-zinc-500">
//         Sorry, the menu is not available right now.
//       </div>
//     );
//   }

//   const categories = menu.sections.map((section, idx) => ({
//     id: idx,
//     name: section.sectionname,
//     image: section.sectionImage || "/api/placeholder/48/48",
//   }));

//   const currentSection = menu.sections[selectedSection];

//   return (
//     <div className="bg-zinc-50 min-h-screen font-sans">
//       <Toaster position="top-center" reverseOrder={false} />
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 w-full border-b border-zinc-200">
//         <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="bg-orange-500 rounded-2xl p-3 shadow-lg">
//               <UtensilsCrossed className="text-white w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-xl lg:text-2xl font-bold text-zinc-800">
//                 {menu.restaurantName || "Restaurant"}
//               </h1>
//               <p className="text-sm font-medium text-orange-600 flex items-center">
//                 <Clock size={14} className="mr-1.5" />
//                 {floor} • {table}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => setShowCart(true)}
//             className="relative bg-orange-500 text-white p-3.5 rounded-2xl shadow-lg hover:shadow-orange-300 transform hover:scale-110 transition-all duration-300"
//           >
//             <ShoppingCart size={24} />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white animate-bounce">
//                 {cart.reduce((total, item) => total + item.quantity, 0)}
//               </span>
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Main Container */}
//       <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 gap-4 lg:gap-8">
//         {/* Sidebar */}
//         <aside className="w-full lg:w-1/4 xl:w-1/5">
//           <div className="bg-white shadow-lg rounded-2xl border border-zinc-200 p-4 lg:sticky lg:top-24">
//             <div className="mb-2 lg:mb-4">
//               <h2 className="text-xl font-bold text-zinc-800 mb-1">Categories</h2>
//               <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
//             </div>
//             <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   className={`flex-shrink-0 flex flex-col gap-1 items-center justify-center p-3 w-24 lg:w-full rounded-xl transition-all duration-300 text-left ${
//                     selectedSection === category.id
//                       ? "bg-orange-500 text-white shadow-md"
//                       : "text-zinc-700 hover:bg-zinc-100"
//                   }`}
//                   onClick={() => setSelectedSection(category.id)}
//                 >
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-12 h-12 rounded-lg object-cover shadow-sm"
//                     onError={(e) => {
//                       e.target.src = "/api/placeholder/48/48";
//                     }}
//                   />
//                   <span className="font-semibold text-sm">{category.name}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Main Section */}
//         <main className="w-full lg:w-3/4 xl:w-4/5">
//           <div className="mb-4 lg:mb-8">
//             <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-800 mb-2 tracking-tight">
//               {currentSection?.sectionname || "Menu Items"}
//             </h2>
//             <div className="w-20 h-1.5 bg-orange-500 rounded-full"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
//             {currentSection?.items?.length === 0 ? (
//               <div className="col-span-full py-20 text-zinc-400 text-center italic">
//                 No items in this category.
//               </div>
//             ) : (
//               currentSection.items.map((item) => (
//                 <div
//                   key={item._id}
//                   // *** CHANGE HERE: Removed flex-col, kept flex-row ***
//                   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-zinc-200 flex flex-row gap-5 transform hover:-translate-y-1"
//                 >
//                   {/* Image: Now fixed width/height for consistent alignment */}
//                   <img
//                     src={item.image || "/api/placeholder/150/150"}
//                     alt={item.itemname}
//                     className="w-18 h-18 object-cover rounded-xl shadow-sm flex-shrink-0" // Changed w-full sm:w-32 h-40 sm:h-32 to fixed w-32 h-32
//                     onError={(e) => { e.target.src = "/api/placeholder/150/150"; }}
//                   />
//                   <div className="flex-1 flex flex-col">
//                     <h3 className="text-xl font-bold text-zinc-800 mb-2">
//                       {item.itemname}
//                     </h3>
//                     <div className="mt-auto space-y-1">
//                       {Array.isArray(item.prices) && item.prices.length > 0 ? (
//                         item.prices.map((priceObj) => {
//                           const size = priceObj.size.toLowerCase();
//                           const price = priceObj.price;
//                           const cartEntry = cart.find(
//                             (e) => e.itemId === item._id && e.size === size
//                           );
//                           const quantity = cartEntry?.quantity || 0;
//                           return (
//                             <div key={size} className="flex items-center justify-between">
//                               <div className="flex items-center gap-1">
//                                 <span className="text-zinc-700 font-semibold text-md w-20">
//                                   {size.charAt(0).toUpperCase() + size.slice(1)}
//                                 </span>
//                                 <span className="text-lg font-bold text-zinc-900">
//                                   ₹{price}
//                                 </span>
//                               </div>
//                               <div className="flex items-center">
//                                 {quantity > 0 ? (
//                                   <div className="flex items-center space-x-1 bg-orange-50 rounded-full px-1.5 py-1">
//                                     <button onClick={() => removeFromCart(item._id, size)} className="bg-white hover:bg-orange-100 text-orange-600 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 shadow">
//                                       <Minus size={16} />
//                                     </button>
//                                     <span className="text-lg font-bold text-orange-600 w-8 text-center">
//                                       {quantity}
//                                     </span>
//                                     <button onClick={() => addToCart(item, size)} className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 shadow">
//                                       <Plus size={16} />
//                                     </button>
//                                   </div>
//                                 ) : (
//                                   <button onClick={() => addToCart(item, size)} className="bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
//                                     Add
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           );
//                         })
//                       ) : (
//                         <span className="text-zinc-400 italic text-sm"> Price not available </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>
//       </div>

//       {/* --- The Cart Modal is already quite responsive, no major changes needed --- */}
//       {showCart && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
//             <div className="bg-zinc-50 w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
//             <header className="bg-orange-500 p-5 text-white rounded-t-3xl">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold">Your Order</h2>
//                 <button onClick={() => setShowCart(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-200">
//                   <X size={20} />
//                 </button>
//               </div>
//               <p className="text-orange-100 mt-1 uppercase text-sm font-semibold">
//                 {floor} • {table}
//               </p>
//             </header>
//             <div className="p-5 overflow-y-auto flex-1">
//               {cart.length === 0 ? (
//                 <div className="text-center text-zinc-500 py-20">
//                   <ShoppingCart size={48} className="mx-auto text-zinc-300" />
//                   <p className="mt-4 text-lg">Your cart is empty.</p>
//                   <p className="text-sm">Add some items to get started!</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {cart.map((entry) => {
//                     const { itemId, size, quantity } = entry;
//                     const item = menu.sections.flatMap((s) => s.items).find((i) => i._id === itemId);
//                     const priceObj = item?.prices?.find((p) => p.size.toLowerCase() === size);
//                     if (!item || !priceObj) return null;
//                     return (
//                       <div key={itemId + size} className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border">
//                         <div className="flex items-center gap-3">
//                           <img src={item.image} className="w-14 h-14 rounded-lg object-cover" />
//                           <div>
//                             <h4 className="font-bold text-zinc-800">{item.itemname}</h4>
//                             <span className="text-xs font-semibold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full"> {size.toUpperCase()} </span>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                            <span className="font-bold text-zinc-800 w-16 text-right"> ₹{priceObj.price * quantity} </span>
//                           <div className="flex items-center space-x-1 bg-zinc-100 rounded-full p-1">
//                             <button onClick={() => removeFromCart(itemId, size)} className="w-7 h-7 hover:bg-zinc-200 rounded-full flex items-center justify-center transition-colors">
//                               <Minus size={14} />
//                             </button>
//                             <span className="font-bold text-zinc-800 w-7 text-center">{quantity}</span>
//                             <button onClick={() => addToCart(item, size)} className="w-7 h-7 bg-orange-500 text-white hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors">
//                               <Plus size={14} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//             <footer className="p-5 bg-white border-t-2 border-dashed border-zinc-200 rounded-b-3xl">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-semibold text-zinc-600">Total</span>
//                 <span className="text-3xl font-bold text-orange-600">₹{cartTotal}</span>
//               </div>
//               <button
//                 className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transform hover:scale-105 disabled:bg-zinc-300 disabled:shadow-none disabled:scale-100"
//                 onClick={createOrder}
//                 disabled={cart.length === 0}
//               >
//                 Place Order
//               </button>
//             </footer>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RestaurantMenu;

import React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Clock,
  ShoppingCart,
  Plus,
  Minus,
  X,
  ChefHat,
  UtensilsCrossed,
} from "lucide-react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// --- Price Selection Modal Component ---
const PriceSelectionModal = ({
  item,
  cart,
  onClose,
  onAddToCart,
  onRemoveFromCart,
}) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={item.image || "/api/placeholder/150/150"}
            alt={item.itemname}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-bold text-zinc-800">{item.itemname}</h3>
          <p className="text-zinc-500 mt-1">
            Select a size to add to your order.
          </p>
          <div className="mt-4 space-y-3">
            {item.prices.map((priceObj) => {
              const size = priceObj.size.toLowerCase();
              const price = priceObj.price;
              const cartEntry = cart.find(
                (e) => e.itemId === item._id && e.size === size
              );
              const quantity = cartEntry?.quantity || 0;

              return (
                <div
                  key={size}
                  className="bg-zinc-50 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-zinc-700">
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </span>
                    <p className="font-bold text-zinc-900 text-lg">₹{price}</p>
                  </div>
                  <div>
                    {quantity > 0 ? (
                      <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-sm">
                        <button
                          onClick={() => onRemoveFromCart(item._id, size)}
                          className="text-orange-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold text-orange-600 text-lg w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(item, size)}
                          className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-orange-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item, size)}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold py-2 px-5 rounded-full transition-all duration-200 text-sm"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const RestaurantMenu = () => {
  const { restaurantId, placeId, floor, table } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/user/getMenuForUser/${restaurantId}`
        );
        setMenu(res.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setMenu(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [restaurantId]);

  useEffect(() => {
    const storedCart = localStorage.getItem(`cart_${restaurantId}`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [restaurantId]);

  useEffect(() => {
    localStorage.setItem(`cart_${restaurantId}`, JSON.stringify(cart));
  }, [cart, restaurantId]);

  const addToCart = (item, size) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (e) => e.itemId === item._id && e.size === size
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { itemId: item._id, size, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId, size) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (e) => e.itemId === itemId && e.size === size
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        if (updated[existingIndex].quantity > 1) {
          updated[existingIndex].quantity -= 1;
        } else {
          updated.splice(existingIndex, 1);
        }
        return updated;
      }
      return prev;
    });
  };

  const cartTotal = useMemo(() => {
    if (!menu?.sections) return 0;
    return cart.reduce((total, { itemId, size, quantity }) => {
      const item = menu.sections
        .flatMap((sec) => sec.items)
        .find((i) => i._id === itemId);
      const price =
        item?.prices?.find((p) => p.size.toLowerCase() === size)?.price || 0;
      return total + price * quantity;
    }, 0);
  }, [cart, menu]);

  const createOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/order/create-order`, {
        items: cart,
        placeId,
        restaurantId,
      });
      if (response.status === 201) {
        toast.success("Order Placed Successfully");
        setCart([]);
        localStorage.removeItem(`cart_${restaurantId}`);
        setShowCart(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-xl font-semibold text-zinc-700">
        <ChefHat className="text-orange-500 h-16 w-16 animate-pulse" />
        <p className="mt-4">Loading the Tastiest Menu...</p>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-lg text-zinc-500">
        <UtensilsCrossed className="text-red-500 h-16 w-16" />
        <p className="mt-4 font-semibold">Could not load the menu.</p>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  const categories = menu.sections.map((section, idx) => ({
    id: idx,
    name: section.sectionname,
  }));

  const currentSection = menu.sections[selectedSection];

  return (
    <div className="bg-zinc-50 min-h-screen font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 w-full border-b border-zinc-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-500 rounded-2xl p-3 shadow-lg">
              <UtensilsCrossed className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-zinc-800">
                {menu.restaurantName || "Restaurant"}
              </h1>
              <p className="text-sm font-medium text-orange-600 flex items-center">
                <Clock size={14} className="mr-1.5" />
                {floor} • {table}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-orange-500 text-white p-3.5 rounded-2xl shadow-lg hover:shadow-orange-300 transform hover:scale-110 transition-all duration-300"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white animate-bounce">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
        {/* Mobile Sticky Categories */}
        <div className="lg:hidden sticky top-[77px] z-30 bg-white/80 backdrop-blur-lg border-b border-zinc-200">
          <nav className="flex flex-row gap-2 overflow-x-auto p-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedSection === category.id
                    ? "bg-orange-500 text-white shadow"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
                onClick={() => setSelectedSection(category.id)}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-1/4 xl:w-1/5 p-4 sm:p-6 lg:p-8">
          <div className="bg-white shadow-lg rounded-2xl border border-zinc-200 p-4 sticky top-28">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-zinc-800 mb-1">
                Categories
              </h2>
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
            </div>
            <nav className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex items-center gap-3 p-3 w-full rounded-xl transition-all duration-300 text-left ${
                    selectedSection === category.id
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-zinc-700 hover:bg-orange-50"
                  }`}
                  onClick={() => setSelectedSection(category.id)}
                >
                  <span className="font-semibold">{category.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Menu Section */}
        <main className="w-full lg:w-3/4 xl:w-4/5 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-800 mb-2 tracking-tight">
              {currentSection?.sectionname || "Menu Items"}
            </h2>
            <div className="w-20 h-1.5 bg-orange-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {currentSection?.items?.length === 0 ? (
              <div className="col-span-full py-20 text-zinc-400 text-center italic">
                No items in this category.
              </div>
            ) : (
              currentSection.items.map((item) => {
                const isSinglePrice = item.prices?.length === 1;
                const firstPriceInfo = item.prices?.[0];

                const singlePriceCartEntry = isSinglePrice
                  ? cart.find(
                      (e) =>
                        e.itemId === item._id &&
                        e.size === firstPriceInfo.size.toLowerCase()
                    )
                  : null;
                const singlePriceQuantity = singlePriceCartEntry?.quantity || 0;

                // NEW: Calculate total quantity for multi-price items
                const totalQuantityForItem = isSinglePrice
                  ? 0
                  : cart
                      .filter((cartItem) => cartItem.itemId === item._id)
                      .reduce((sum, current) => sum + current.quantity, 0);

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-200 flex flex-col transform hover:-translate-y-1 overflow-hidden"
                  >
                    <img
                      src={item.image || "/api/placeholder/150/150"}
                      alt={item.itemname}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-zinc-800 flex-1">
                        {item.itemname}
                      </h3>
                      <div className="flex items-end justify-between mt-4">
                        <div className="text-left">
                          {firstPriceInfo ? (
                            <>
                              <span className="text-xs text-zinc-500">
                                {isSinglePrice ? "Price" : "Starts from"}
                              </span>
                              <p className="text-xl font-bold text-zinc-800">
                                ₹{firstPriceInfo.price}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-zinc-500">
                              Not Available
                            </p>
                          )}
                        </div>

                        {isSinglePrice ? (
                          singlePriceQuantity > 0 ? (
                            <div className="flex items-center space-x-1 bg-zinc-100 rounded-full p-1 shadow-sm">
                              <button
                                onClick={() =>
                                  removeFromCart(
                                    item._id,
                                    firstPriceInfo.size.toLowerCase()
                                  )
                                }
                                className="w-8 h-8 hover:bg-zinc-200 rounded-full flex items-center justify-center transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-bold text-zinc-800 w-8 text-center">
                                {singlePriceQuantity}
                              </span>
                              <button
                                onClick={() =>
                                  addToCart(
                                    item,
                                    firstPriceInfo.size.toLowerCase()
                                  )
                                }
                                className="w-8 h-8 bg-orange-500 text-white hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                addToCart(
                                  item,
                                  firstPriceInfo.size.toLowerCase()
                                )
                              }
                              className="bg-orange-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
                            >
                              Add
                            </button>
                          )
                        ) : totalQuantityForItem > 0 ? (
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="relative bg-white border-2 border-orange-500 text-orange-500 font-bold py-2 px-4 rounded-xl hover:bg-orange-50 transition-colors"
                          >
                            Edit
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                              {totalQuantityForItem}
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="bg-orange-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
                          >
                            Customize
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      <PriceSelectionModal
        item={selectedItem}
        cart={cart}
        onClose={() => setSelectedItem(null)}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />

      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-50 w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
            <header className="bg-orange-500 p-5 text-white rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Order</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-orange-100 mt-1 uppercase text-sm font-semibold">
                {floor} • {table}
              </p>
            </header>
            <div className="p-5 overflow-y-auto flex-1">
              {cart.length === 0 ? (
                <div className="text-center text-zinc-500 py-20">
                  <ShoppingCart size={48} className="mx-auto text-zinc-300" />
                  <p className="mt-4 text-lg">Your cart is empty.</p>
                  <p className="text-sm">Add some items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((entry) => {
                    const { itemId, size, quantity } = entry;
                    const item = menu.sections
                      .flatMap((s) => s.items)
                      .find((i) => i._id === itemId);
                    const priceObj = item?.prices?.find(
                      (p) => p.size.toLowerCase() === size
                    );
                    if (!item || !priceObj) return null;
                    return (
                      <div
                        key={itemId + size}
                        className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            className="w-14 h-14 rounded-lg object-cover"
                            alt={item.itemname}
                          />
                          <div>
                            <h4 className="font-bold text-zinc-800">
                              {item.itemname}
                            </h4>
                            {size !== "default" && (
                              <span className="text-xs font-semibold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
                                {size.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-zinc-800 w-16 text-right">
                            {" "}
                            ₹{priceObj.price * quantity}{" "}
                          </span>
                          <div className="flex items-center space-x-1 bg-zinc-100 rounded-full p-1">
                            <button
                              onClick={() => removeFromCart(itemId, size)}
                              className="w-7 h-7 hover:bg-zinc-200 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-bold text-zinc-800 w-7 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item, size)}
                              className="w-7 h-7 bg-orange-500 text-white hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <footer className="p-5 bg-white border-t-2 border-dashed border-zinc-200 rounded-b-3xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-zinc-600">
                  Total
                </span>
                <span className="text-3xl font-bold text-orange-600">
                  ₹{cartTotal}
                </span>
              </div>
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transform hover:scale-105 disabled:bg-zinc-300 disabled:shadow-none disabled:scale-100"
                onClick={createOrder}
                disabled={cart.length === 0}
              >
                Place Order
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
