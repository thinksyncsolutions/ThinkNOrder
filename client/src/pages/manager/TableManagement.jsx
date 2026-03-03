import React, { useState } from "react";
import Menu from "./Menu";
import BillManagement from "./BillManagement";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: Icons for the arrow
import { addToCart, removeFromCart } from "../../utils/cartUtils";

const TableManagement = ({ placeId }) => {
  const [tableCart, setTableCart] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // New state for full-screen toggle

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
    <div className="flex w-full h-screen overflow-hidden relative">
      {/* Left side (Menu) - Hidden when expanded */}
      <div 
        className={`${
          isExpanded ? "w-0 opacity-0" : "w-[70%]"
        } border-r h-full overflow-y-auto transition-all duration-300 ease-in-out`}
      >
        {!isExpanded && (
          <Menu
            addToTableCart={handleAddToTableCart}
            removeFromTableCart={handleRemoveFromTableCart}
            tableCart={tableCart}
          />
        )}
      </div>

      {/* Right side (Bill Management) */}
      <div 
        className={`${
          isExpanded ? "w-full" : "w-[30%]"
        } h-full flex flex-col overflow-y-auto transition-all duration-300 ease-in-out relative`}
      >
        {/* Toggle Arrow Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border shadow-md p-1 rounded-r-lg hover:bg-gray-100"
          title={isExpanded ? "Show Menu" : "Full Screen Bill"}
        >
          {isExpanded ? (
            <ChevronRight className="w-6 h-6 text-gray-600" />
          ) : (
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          )}
        </button>

        <BillManagement
          tableCart={tableCart}
          placeId={placeId}
          addToTableCart={handleAddToTableCart}
          removeFromTableCart={handleRemoveFromTableCart}
          clearTableCart={handleClearCart}
        />
      </div>
    </div>
  );
};

export default TableManagement;