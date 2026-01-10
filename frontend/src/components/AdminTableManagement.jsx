import React, { useState } from "react";
import Menu from "./Menu";
import BillManagement from "./BillManagement";

const AdminTableManagement = ({ placeId }) => {
  const [tableCart, setTableCart] = useState([]);

  // Add item to table cart
  const handleAddToTableCart = (item) => {
    setTableCart((prev) => {
      const existingIndex = prev.findIndex(
        (e) => e.itemId === (item.itemId || item._id) && e.selectedPrice._id === item.selectedPrice._id
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          itemId: item.itemId || item._id,
          itemname: item.itemname,
          selectedPrice: item.selectedPrice,
          selectedSize: item.selectedPrice.size,
          price: item.selectedPrice.price,
          quantity: 1,
        },
      ];
    });
  };

  // Remove item from table cart
  const handleRemoveFromTableCart = (itemId, selectedPriceId) => {
    setTableCart((prev) => {
      const existingItem = prev.find(
        (e) => e.itemId === itemId && e.selectedPrice._id === selectedPriceId
      );

      // If item quantity is 1, remove it from the cart
      if (existingItem?.quantity === 1) {
        return prev.filter(
          (item) => item.itemId !== itemId || item.selectedPrice._id !== selectedPriceId
        );
      }
      
      // Otherwise, just decrease the quantity
      return prev.map((item) =>
        item.itemId === itemId && item.selectedPrice._id === selectedPriceId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const handleClearCart = () => {
    setTableCart([]);
  }

  return (
    <div className="flex w-full h-screen">
      {/* Left side (Menu) */}
      <div className="w-[70%] border-r h-full overflow-y-auto">
        {/* === NEW: Pass tableCart and remove function to Menu === */}
        <Menu
          addToTableCart={handleAddToTableCart}
          removeFromTableCart={handleRemoveFromTableCart}
          tableCart={tableCart}
        />
      </div>

      {/* Right side (Bill Management) */}
      <div className="w-[30%] h-full flex flex-col overflow-y-auto">
        <BillManagement
          tableCart={tableCart}
          placeId={placeId}
          addToTableCart={handleAddToTableCart}
          // Pass the specific decrement function to the bill side as well
          removeFromTableCart={handleRemoveFromTableCart}
          // We can also create a function to clear the cart entirely
          clearTableCart={handleClearCart}
        />
      </div>
    </div>
  );
};

export default AdminTableManagement;