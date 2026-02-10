import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMenuSections,
  fetchMenuItemsBySection,
} from "../../redux/features/menu/menu.thunk";

const Menu = () => {
  const dispatch = useDispatch();
  // const [showModal, setShowModal] = useState(false);
  const { sections, items, loading, error } = useSelector((state) => state.menu);

  // 1️⃣ Fetch sections only once
  useEffect(() => {
    dispatch(fetchMenuSections());
  }, [dispatch]);

  // 2️⃣ When sections load, fetch items
  useEffect(() => {
    if (sections.length > 0) {
      sections.forEach((section) => {
        dispatch(fetchMenuItemsBySection({ sectionId: section._id }));
      });
    }
  }, [sections, dispatch]);

  return (
    <div>
      <h1>Menu</h1>

      {/* <button onClick={() => setShowModal(true)}>Add Section</button> */}

      {loading && <p>Loading menu...</p>}
      {error && <p>Error: {error}</p>}

      {sections.map((section) => (
        <div key={section._id}>
          <h2>{section.name}</h2>

          <ul>
            {items
              .filter((item) => item.sectionId === section._id) // ✅ FIXED
              .map((item) => (
                <li key={item._id}>
                  {item.name} — ₹{item.prices?.[0]?.price}
                </li>
              ))}
          </ul>
        </div>
      ))}

      
    </div>
  );
};

export default Menu;
