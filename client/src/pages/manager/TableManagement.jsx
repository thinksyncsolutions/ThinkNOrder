import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Menu from "./Menu";
import BillManagement from "./BillManagement";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: Icons for the arrow
import { addToCart, removeFromCart } from "../../utils/cartUtils";

const TableManagement = () => {
  const { tableId } = useParams(); // from URL
  const location = useLocation();
  const placeDetails = location.state?.place; // Catch the place object passed from Orders.jsx

  const [tableCart, setTableCart] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true); // New state for full-screen toggle

 const handleAddToTableCart = (item) => {
  setTableCart((prev) =>
    addToCart(
      prev,
      { ...item, _id: item.itemId || item._id },
      item.selectedPrice,
      { idKey: "_id", qtyKey: "quantity" }
    )
  );
};

const handleRemoveFromTableCart = (itemId, label) => {
  setTableCart((prev) =>
    removeFromCart(prev, itemId, label, {
      idKey: "_id",
      qtyKey: "quantity",
    })
  );
};

  const handleClearCart = () => {
    setTableCart([]);
  };

  return (
    <div className="flex w-full h-[calc(100vh-80px)] overflow-hidden bg-white">
      {/* Left side (Menu) */}
      <div 
        className={`${
          isExpanded ? "w-0 opacity-0 invisible" : "w-[60%]"
        } h-full overflow-y-auto transition-all duration-500 ease-in-out border-r border-orange-100`}
      >
        <Menu
          addToTableCart={handleAddToTableCart}
          removeFromTableCart={handleRemoveFromTableCart}
          tableCart={tableCart}
        />
      </div>

      {/* Right side (Bill Management) */}
      <div 
        className={`${
          isExpanded ? "w-full" : "w-[40%]"
        } h-full flex flex-col transition-all duration-500 ease-in-out relative bg-orange-50/30`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-orange-600 text-white shadow-xl p-2 rounded-full hover:bg-orange-700 transition-transform active:scale-90"
        >
          {isExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <BillManagement
          tableCart={tableCart}
          placeId={tableId}
          placeDetails={placeDetails} // Pass the full object here
          addToTableCart={handleAddToTableCart}
          removeFromTableCart={handleRemoveFromTableCart}
          clearTableCart={handleClearCart}
        />
      </div>
    </div>
  );
};

export default TableManagement;