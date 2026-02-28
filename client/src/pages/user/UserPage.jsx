import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ShoppingBag, Plus, Minus, X } from "lucide-react";
import { fetchFullMenuForUser } from "../../redux/features/menu/menu.thunk";

const UserPage = () => {
  const dispatch = useDispatch();
  const { restaurantId, branchId, placeId, tableNumber } = useParams();
  const { sections, loading, error } = useSelector((state) => state.menu);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [variantModal, setVariantModal] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    if (restaurantId && branchId) {
      dispatch(fetchFullMenuForUser({ restaurantId, branchId }));
    }
  }, [dispatch, restaurantId, branchId]);

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmitOrder = () => {
  if (cartItems.length === 0) return;

  const orderPayload = {
    restaurantId,
    branchId,
    placeId: placeId, // using placeId from URL params
    items: cartItems.map((item) => ({
      itemId: item._id,
      itemName: item.name,
      selectedSize: item.selectedPrice.label,
      price: item.selectedPrice.price,
      quantity: item.qty,
    })),
  };

  console.log("Final Order Payload:", orderPayload);

  // 👉 Dispatch to backend
  // dispatch(createOrderThunk(orderPayload))

  setCartItems([]);
  setIsCartOpen(false);
};

  /* ===============================
     ADD ITEM WITH SELECTED PRICE
  ================================ */
  const handleAdd = (item, selectedPrice) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i._id === item._id && i.selectedPrice.label === selectedPrice.label,
      );

      if (existing) {
        return prev.map((i) =>
          i._id === item._id && i.selectedPrice.label === selectedPrice.label
            ? { ...i, qty: i.qty + 1 }
            : i,
        );
      }

      return [...prev, { ...item, selectedPrice, qty: 1 }];
    });
  };

  const handleRemove = (itemId, label) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i._id === itemId && i.selectedPrice.label === label
            ? { ...i, qty: i.qty - 1 }
            : i,
        )
        .filter((i) => i.qty > 0),
    );
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.selectedPrice.price * item.qty,
    0,
  );

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-orange-600 font-bold">
        Loading Menu...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-600 min-h-screen">
        {error.message}
      </div>
    );

  return (
    <div className="bg-white min-h-screen text-zinc-900 pb-20">
      {/* ================= HEADER ================= */}
      <div className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-black text-orange-600 uppercase">
              The Menu
            </h1>
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              TABLE {tableNumber}
            </span>
          </div>

          <div className="flex overflow-x-auto gap-3">
            {sections.map((section) => (
              <button
                key={section._id}
                onClick={() => scrollToSection(section._id)}
                className="whitespace-nowrap px-5 py-2 rounded-lg bg-zinc-100 border text-sm hover:border-orange-600 hover:text-orange-600"
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MENU ================= */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {sections.map((section) => (
          <div
            key={section._id}
            ref={(el) => (sectionRefs.current[section._id] = el)}
            className="mb-12"
          >
            <h2 className="text-xl font-bold text-orange-600 uppercase mb-6">
              {section.name}
            </h2>

            <div className="grid gap-4">
              {section.items?.map((item) => {
                const existingVariants = cartItems.filter(
                  (i) => i._id === item._id,
                );

                const totalQty = existingVariants.reduce(
                  (acc, i) => acc + i.qty,
                  0,
                );

                return (
                  <div
                    key={item._id}
                    className="border p-4 rounded-2xl flex justify-between items-center"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-xs text-zinc-500 mb-2">
                        {item.description}
                      </p>

                      <div className="text-orange-600 font-bold">
                        {item.prices.map((p, i) => (
                          <span key={i} className="mr-3">
                            {p.label !== "default" && `${p.label}: `}₹{p.price}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      {!totalQty ? (
                        <button
                          onClick={() =>
                            item.prices.length === 1
                              ? handleAdd(item, item.prices[0])
                              : setVariantModal(item)
                          }
                          className="bg-zinc-900 text-white px-4 py-2 rounded text-xs font-bold"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <button
                            onClick={() =>
                              item.prices.length === 1
                                ? handleRemove(item._id, item.prices[0].label)
                                : setVariantModal(item)
                            }
                            className="px-1"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-2">{totalQty}</span>
                          <button
                            onClick={() =>
                              item.prices.length === 1
                                ? handleAdd(item, item.prices[0])
                                : setVariantModal(item)
                            }
                            className="px-1"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ================= VARIANT MODAL ================= */}
      {variantModal && (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">
                Select Variant - {variantModal.name}
              </h3>
              <button onClick={() => setVariantModal(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-4">
              {variantModal.prices.map((price, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleAdd(variantModal, price);
                    setVariantModal(null);
                  }}
                  className="w-full border p-3 rounded-xl flex justify-between hover:border-orange-600"
                >
                  <span className="capitalize font-semibold">
                    {price.label}
                  </span>
                  <span className="text-orange-600 font-bold">
                    ₹{price.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= CART BUTTON ================= */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
        >
          <ShoppingBag size={24} />
          <div>
            <p className="text-xs font-bold uppercase">View Cart</p>
            <p className="font-bold">₹{cartTotal}</p>
          </div>
        </button>
      )}

      {/* ================= CART SIDEBAR ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full p-6 flex flex-col">
            <div className="flex justify-between mb-6">
              <h2 className="font-bold text-xl">Your Order</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedPrice.label}`}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">
                      {item.name} ({item.selectedPrice.label})
                    </p>
                    <p className="text-orange-600">
                      ₹{item.selectedPrice.price * item.qty}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleRemove(item._id, item.selectedPrice.label)
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleAdd(item, item.selectedPrice)}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-bold text-orange-600">₹{cartTotal}</span>
              </div>
              <button onClick={handleSubmitOrder} className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
