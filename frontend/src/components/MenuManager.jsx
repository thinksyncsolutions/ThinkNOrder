import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

// Cloudinary config via Vite env
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";
const CLOUDINARY_UPLOAD_URL = CLOUDINARY_CLOUD_NAME
  ? `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
  : "";

// Price size dropdown options
const PRICE_SIZES = ["default", "small", "medium", "large", "regular", "full", "half"];

const emptyPrice = { size: "default", price: "" };
const emptyItem = { itemname: "", image: "", prices: [{ ...emptyPrice }] };

// --- ICONS ---
const IconPencil = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
);
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
);
const IconSave = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
);
const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconUpload = () => (
    <svg className="w-8 h-8 mb-2 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /></svg>
);


// Reusable helper: upload a File to Cloudinary (unsigned) with optional progress callback
async function uploadToCloudinary(file, onProgress) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_UPLOAD_URL) {
    throw new Error("Cloudinary env vars missing: VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET");
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
    onUploadProgress: (evt) => {
      if (onProgress && evt.total) {
        onProgress(Math.round((evt.loaded * 100) / evt.total));
      }
    },
  });
  return res.data; // contains secure_url, public_id, width, height, etc.
}

// Small edit icon button (overlay)
function EditIconButton({ onClick, title = "Edit image" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="absolute top-1 right-1 inline-flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm border border-slate-300 text-slate-700 shadow-sm hover:bg-white transition-all duration-200"
      aria-label={title}
    >
      <IconPencil />
    </button>
  );
}

// Image picker + uploader (used in forms)
function ImageUploadField({
  label = "Image",
  value,
  onChangeUrl,
  onUploadingChange,
  showUrlInput = true,
  compact = false,
}) {
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const handlePick = () => inputRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      onUploadingChange?.(true);
      setProgress(0);
      const data = await uploadToCloudinary(file, setProgress);
      onChangeUrl(data.secure_url || "");
    } catch (err) {
      alert("Image upload failed. Please try again.");
    } finally {
      onUploadingChange?.(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };
  
  const sizeClass = compact ? "h-20 w-20" : "h-24 w-24";

  return (
    <div className={`flex flex-col ${compact ? "gap-1" : "gap-2"}`}>
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}

      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative flex-shrink-0">
            <img
              src={value}
              alt="Selected"
              className={`${sizeClass} object-cover bg-slate-100 border border-slate-300 rounded-md`}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <EditIconButton onClick={handlePick} />
          </div>
        ) : (
          <button
            type="button"
            onClick={handlePick}
            className={`${sizeClass} flex-shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-md text-slate-500 hover:bg-slate-50 hover:border-sky-500 transition-colors`}
          >
            <IconUpload />
            <span className="text-xs font-semibold">Upload</span>
          </button>
        )}

        {showUrlInput && (
          <div className="flex-grow">
            <input
              type="url"
              value={value || ""}
              onChange={(e) => onChangeUrl(e.target.value)}
              placeholder="Or paste image URL"
              className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
             {progress > 0 && (
                <div className="w-full mt-2">
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-1.5 bg-sky-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
            )}
          </div>
        )}
        
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}

export default function MenuManager() {
  const [menu, setMenu] = useState(null); // Contains entire menu with menuId, sections, items
  const [loading, setLoading] = useState(true);
  const [addSectionOpen, setAddSectionOpen] = useState(false);
  const [newSection, setNewSection] = useState({
    sectionname: "",
    sectionImage: "",
    items: [{ ...emptyItem }],
  });
  const [uploadingSectionImage, setUploadingSectionImage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  async function fetchMenu() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${baseURL}/menu/getMenu`, { withCredentials: true });
      setMenu(res.data);
      console.log(res.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch menu");
    }
    setLoading(false);
  }

  // Create full menu if no menu exists yet
  // Otherwise, add section and items separately
  const handleCreateSection = async (e) => {
    e.preventDefault();
    setError("");

    if (!newSection.sectionname.trim()) {
      setError("Section name is required");
      return;
    }

    if (uploadingSectionImage) {
      setError("Please wait until the section image finishes uploading");
      return;
    }

    const validItems = newSection.items.filter(
      (item) =>
        item.itemname.trim() &&
        item.prices.length > 0 &&
        item.prices.every((p) => PRICE_SIZES.includes(p.size) && p.price !== "" && !isNaN(p.price))
    );

    if (validItems.length === 0) {
      setError("At least one valid item with size and price is required");
      return;
    }

    const anyItemUploading = validItems.some((it) => it.__uploading === true);
    if (anyItemUploading) {
      setError("Please wait until all item images finish uploading");
      return;
    }

    try {
      if (!menu) {
        // No menu exists - create whole menu with all sections/items
        const createBody = {
          sections: [
            {
              sectionname: newSection.sectionname.trim(),
              sectionImage: newSection.sectionImage.trim(),
              items: validItems.map(({ __uploading, ...rest }) => rest),
            },
          ],
        };
        await axios.post(`${baseURL}/menu/create`, createBody, { withCredentials: true });
      } else {
        // Menu exists, add section separately
        // 1. Add section with image
        const sectionResp = await axios.post(
          `${baseURL}/menu/section/${menu.menuId}`,
          {
            sectionname: newSection.sectionname.trim(),
            sectionImage: newSection.sectionImage.trim(),
          },
          { withCredentials: true }
        );
        const createdSection = sectionResp.data.section;

        // 2. Add each item to this section
        for (const item of validItems) {
          const { __uploading, ...clean } = item;
          await axios.post(`${baseURL}/menu/item/${createdSection._id}`, clean, { withCredentials: true });
        }
      }

      // Reset form, close panel and refresh menu
      setNewSection({ sectionname: "", sectionImage: "", items: [{ ...emptyItem }] });
      setAddSectionOpen(false);
      fetchMenu();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add section");
    }
  };

  // Edit section name and image
  const handleEditSection = async (sid, updates) => {
    if (!updates.sectionname?.trim()) return;
    setError("");
    try {
      await axios.put(`${baseURL}/menu/section/${sid}`, updates, { withCredentials: true });
      setMenu((m) => ({
        ...m,
        sections: m.sections.map((s) => (s._id === sid ? { ...s, ...updates } : s)),
      }));
    } catch {
      setError("Failed to update section");
    }
  };

  // Delete section and all its items
  const handleDeleteSection = async (sid) => {
    if (!window.confirm("Delete this section and all its items?")) return;
    setError("");
    try {
      await axios.delete(`${baseURL}/menu/section/${sid}`, { withCredentials: true });
      setMenu((m) => ({
        ...m,
        sections: m.sections.filter((s) => s._id !== sid),
      }));
    } catch {
      setError("Failed to delete section");
    }
  };

  // Add item to section
  const handleAddItem = async (sid, newItem, clearCb) => {
    setError("");

    if (!newItem.itemname.trim()) {
      setError("Item name is required");
      return;
    }
    if (
      !newItem.prices.length ||
      !newItem.prices.every((p) => PRICE_SIZES.includes(p.size) && p.price !== "" && !isNaN(p.price))
    ) {
      setError("Each price must have a valid size and price");
      return;
    }
    if (newItem.__uploading) {
      setError("Please wait until the item image finishes uploading");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/menu/item/${sid}`, newItem, { withCredentials: true });
      setMenu((m) => ({
        ...m,
        sections: m.sections.map((s) => (s._id === sid ? { ...s, items: [...s.items, res.data.item] } : s)),
      }));
      clearCb();
    } catch {
      setError("Failed to add item");
    }
  };

  // Edit existing item
  const handleEditItem = async (iid, fields) => {
    setError("");

    if (
      fields.prices &&
      (!fields.prices.length ||
        !fields.prices.every((p) => PRICE_SIZES.includes(p.size) && p.price !== "" && !isNaN(p.price)))
    ) {
      setError("Each price must have a valid size and price");
      return;
    }
    if (fields.__uploading) {
      setError("Please wait until the image finishes uploading");
      return;
    }

    try {
      const { __uploading, ...clean } = fields;
      await axios.put(`${baseURL}/menu/item/${iid}`, clean, { withCredentials: true });
      setMenu((m) => ({
        ...m,
        sections: m.sections.map((s) => ({
          ...s,
          items: s.items.map((item) => (item._id === iid ? { ...item, ...clean } : item)),
        })),
      }));
    } catch {
      setError("Failed to update item");
    }
  };

  // Delete item
  const handleDeleteItem = async (iid, sid) => {
    if (!window.confirm("Delete this item?")) return;
    setError("");
    try {
      await axios.delete(`${baseURL}/menu/item/${iid}`, { withCredentials: true });
      setMenu((m) => ({
        ...m,
        sections: m.sections.map((s) =>
          s._id === sid ? { ...s, items: s.items.filter((item) => item._id !== iid) } : s
        ),
      }));
    } catch {
      setError("Failed to delete item");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
        <div className="container mx-auto lg:py-6 py-4 px-4 max-w-5xl">
            <header className="text-center mb-4">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-3xl">Menu Management</h1>
                <p className="mt-2 text-lg text-slate-600">Add, edit, and organize your menu sections and items.</p>
            </header>

            {error && (
                <div role="alert" className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-md mb-8 shadow-sm">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="text-center py-20 text-slate-600 font-medium text-lg">Loading your menu...</div>
            ) : (
                <>
                <div className="mb-10 text-center">
                    <button
                        onClick={() => setAddSectionOpen(!addSectionOpen)}
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-transform duration-200 hover:scale-105 focus:ring-4 focus:ring-indigo-300"
                        aria-expanded={addSectionOpen}
                    >
                    {addSectionOpen ? "Close Panel" : "Add New Section"}
                    </button>
                </div>

                {addSectionOpen && (
                    <form
                    onSubmit={handleCreateSection}
                    className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto mb-12"
                    aria-label="Add new section form"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">New Section Details</h2>

                        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                            <div>
                                <label htmlFor="sectionname" className="block text-sm font-medium mb-1.5 text-slate-700">
                                    Section Name<span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="sectionname"
                                    type="text"
                                    value={newSection.sectionname}
                                    onChange={(e) => setNewSection((s) => ({ ...s, sectionname: e.target.value }))}
                                    required
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                    placeholder="e.g. Starters, Beverages"
                                />
                            </div>

                            <div>
                                <ImageUploadField
                                label="Section Image"
                                value={newSection.sectionImage}
                                onChangeUrl={(url) => setNewSection((s) => ({ ...s, sectionImage: url }))}
                                onUploadingChange={setUploadingSectionImage}
                                showUrlInput={true}
                                />
                            </div>
                        </fieldset>
                        
                        <hr className="my-8" />

                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-slate-800">Items in this Section</h3>
                            <p className="text-sm text-slate-500">Add at least one item to create the section.</p>
                        </div>

                        <div className="space-y-4">
                        {newSection.items.map((item, idx) => (
                            <NewItemForm
                                key={idx}
                                item={item}
                                onChange={(updatedItem) => {
                                    setNewSection((s) => {
                                        const itemsCopy = [...s.items];
                                        itemsCopy[idx] = updatedItem;
                                        return { ...s, items: itemsCopy };
                                    });
                                }}
                                onRemove={() => {
                                    setNewSection((s) => ({
                                        ...s,
                                        items: s.items.filter((_, i) => i !== idx),
                                    }));
                                }}
                                disableRemove={newSection.items.length <= 1}
                            />
                        ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setNewSection((s) => ({ ...s, items: [...s.items, { ...emptyItem }] }))}
                            className="inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 font-semibold mt-4"
                            aria-label="Add another item"
                        >
                            <IconPlus /> Add another item
                        </button>

                        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm transition-transform duration-200 hover:scale-105 focus:ring-4 focus:ring-green-300"
                            >
                                {menu ? "Add Section" : "Create Menu"}
                            </button>
                        </div>
                    </form>
                )}

                <div className="space-y-10">
                    {menu?.sections?.length ? (
                        menu.sections.map((section) => (
                            <SectionBlock
                                key={section._id}
                                section={section}
                                onEditSection={handleEditSection}
                                onDeleteSection={handleDeleteSection}
                                onAddItem={handleAddItem}
                                onEditItem={handleEditItem}
                                onDeleteItem={handleDeleteItem}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-700">No sections found</h3>
                            <p className="text-slate-500 mt-2">Click "Add New Section" to get started.</p>
                        </div>
                    )}
                </div>
                </>
            )}
        </div>
    </div>
  );
}

function NewItemForm({ item, onChange, onRemove, disableRemove }) {
  const updateField = (field, value) => {
    onChange({ ...item, [field]: value });
  };

  const updatePrice = (index, field, value) => {
    const newPrices = [...item.prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    onChange({ ...item, prices: newPrices });
  };

  const addPrice = () => {
    onChange({ ...item, prices: [...item.prices, { ...emptyPrice }] });
  };

  const removePrice = (index) => {
    if (item.prices.length <= 1) return;
    const newPrices = item.prices.filter((_, i) => i !== index);
    onChange({ ...item, prices: newPrices });
  };

  // Handle upload state flag to avoid submit during upload
  const setUploading = (flag) => onChange({ ...item, __uploading: flag });

  return (
    <div className="border border-slate-200 p-4 rounded-lg bg-slate-100/70 relative">
      <div className="absolute top-2 right-2">
         <button
            type="button"
            onClick={onRemove}
            disabled={disableRemove}
            className={`flex items-center justify-center h-7 w-7 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 ${disableRemove ? "opacity-40 cursor-not-allowed" : ""}`}
            aria-label="Remove item"
        >
            <IconClose />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1">
             <label className="block text-sm font-medium mb-1.5 text-slate-700">
                Item Name<span className="text-red-600">*</span>
             </label>
             <input
                type="text"
                required
                value={item.itemname}
                onChange={(e) => updateField("itemname", e.target.value)}
                placeholder="e.g. Veggie Burger"
                className="w-full border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
        </div>
        <div className="lg:col-span-2">
          <ImageUploadField
            label="Item Image (Optional)"
            value={item.image || ""}
            onChangeUrl={(url) => updateField("image", url)}
            onUploadingChange={setUploading}
            showUrlInput={true}
            compact={true}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Prices <span className="text-red-600">*</span>
        </label>
        <div className="space-y-2">
            {item.prices.map((price, idx) => (
            <div key={idx} className="flex gap-2 items-center flex-wrap">
                <select
                    value={price.size}
                    onChange={(e) => updatePrice(idx, "size", e.target.value)}
                    className="border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 text-sm"
                    aria-label={`Select price size for price ${idx + 1}`}
                    required
                >
                    {PRICE_SIZES.map((size) => (
                        <option key={size} value={size}>{size.charAt(0).toUpperCase() + size.slice(1)}</option>
                    ))}
                </select>
                <input
                    type="number"
                    required
                    min={0}
                    step="0.01"
                    placeholder="Price"
                    value={price.price}
                    onChange={(e) => updatePrice(idx, "price", e.target.value === "" ? "" : Number(e.target.value))}
                    className="border-slate-300 rounded-md shadow-sm w-28 text-sm focus:border-sky-500 focus:ring-sky-500"
                    aria-label={`Price value for price ${idx + 1}`}
                />
                <button
                    type="button"
                    onClick={() => removePrice(idx)}
                    disabled={item.prices.length <= 1}
                    className={`flex items-center justify-center h-7 w-7 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 ${item.prices.length <= 1 ? "opacity-40 cursor-not-allowed" : ""}`}
                    aria-label={`Remove price ${idx + 1}`}
                >
                    <IconClose />
                </button>
            </div>
            ))}
        </div>
        <button
          type="button"
          onClick={addPrice}
          className="inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 font-semibold mt-3"
          aria-label="Add another price"
        >
            <IconPlus/> Add price
        </button>
      </div>
    </div>
  );
}

function SectionBlock({ section, onEditSection, onDeleteSection, onAddItem, onEditItem, onDeleteItem }) {
  const [edit, setEdit] = useState(false);
  const [secName, setSecName] = useState(section.sectionname || "");
  const [secImage, setSecImage] = useState(section.sectionImage || "");
  const [itemDraft, setItemDraft] = useState({ ...emptyItem });
  const [addingItem, setAddingItem] = useState(false);
  const [secUploading, setSecUploading] = useState(false);

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-md">
      <header className="p-6 border-b border-slate-200">
        <div className="flex items-start justify-between gap-4">
          {edit ? (
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input
                    type="text"
                    value={secName}
                    onChange={(e) => setSecName(e.target.value)}
                    className="text-2xl font-bold border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    autoFocus
                    aria-label="Edit section name"
                    placeholder="Section name"
                />
                <ImageUploadField
                    label=""
                    value={secImage || ""}
                    onChangeUrl={setSecImage}
                    onUploadingChange={setSecUploading}
                    showUrlInput={true}
                    compact
                />
            </div>
          ) : (
             <div className="flex items-center gap-4">
                {section.sectionImage && (
                    <img
                        src={section.sectionImage}
                        alt={`${section.sectionname} section`}
                        className="h-16 w-16 border-b rounded-lg object-cover border border-slate-200 bg-slate-100"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                )}
                <h2 className="text-2xl font-bold text-slate-800">{section.sectionname}</h2>
            </div>
          )}

          <div className="flex items-center gap-2 flex-shrink-0">
            {edit ? (
              <button
                onClick={() => {
                  if (secUploading) {
                    alert("Please wait until the section image finishes uploading.");
                    return;
                  }
                  if (secName.trim()) {
                    onEditSection(section._id, {
                      sectionname: secName.trim(),
                      sectionImage: (secImage || "").trim(),
                    });
                  }
                  setEdit(false);
                }}
                title="Save section"
                className="h-9 w-9 flex items-center justify-center rounded-lg text-green-600 bg-green-100 hover:bg-green-200"
                aria-label="Save section"
              >
                <IconSave />
              </button>
            ) : (
              <button
                onClick={() => setEdit(true)}
                title="Edit section"
                className="h-9 w-9 flex items-center justify-center rounded-lg text-sky-600 hover:bg-sky-100"
                aria-label="Edit section"
              >
                <IconPencil />
              </button>
            )}
            <button
              onClick={() => onDeleteSection(section._id)}
              title="Delete section"
              className="h-9 w-9 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-100"
              aria-label="Delete section"
            >
              <IconTrash />
            </button>
          </div>
        </div>
      </header>

        <ul className="divide-y divide-slate-200">
            {section.items.map((item) => (
                <ItemBlock
                key={item._id}
                item={item}
                sectionId={section._id}
                onEditItem={onEditItem}
                onDeleteItem={onDeleteItem}
                />
            ))}
        </ul>

      <footer className="p-6">
        {addingItem ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddItem(section._id, itemDraft, () => {
                setAddingItem(false);
                setItemDraft({ ...emptyItem });
              });
            }}
            aria-label="Add new item form"
          >
            <NewItemForm
              item={itemDraft}
              onChange={setItemDraft}
              onRemove={() => {
                setItemDraft({ ...emptyItem });
                setAddingItem(false);
              }}
              disableRemove={true}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setAddingItem(false)}
                className="px-5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-sm"
              >
                Add Item
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAddingItem(true)}
            className="inline-flex items-center gap-2 text-sky-600 border-2 border-dashed border-slate-300 w-full justify-center px-4 py-3 rounded-lg hover:border-sky-500 hover:bg-sky-50 font-semibold transition-colors"
          >
            <IconPlus/> Add Item to Section
          </button>
        )}
      </footer>
    </section>
  );
}

function ItemBlock({ item, sectionId, onEditItem, onDeleteItem }) {
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState(item);
  const [imgUploading, setImgUploading] = useState(false);
  const fileRef = useRef(null);

  const updateField = (field, value) => {
    setDraft((d) => ({ ...d, [field]: value }));
  };

  const updatePrice = (index, field, value) => {
    const newPrices = [...draft.prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    setDraft((d) => ({ ...d, prices: newPrices }));
  };

  const addPrice = () => {
    setDraft((d) => ({ ...d, prices: [...d.prices, { ...emptyPrice }] }));
  };

  const removePrice = (index) => {
    if (draft.prices.length <= 1) return;
    const newPrices = draft.prices.filter((_, i) => i !== index);
    setDraft((d) => ({ ...d, prices: newPrices }));
  };

  const saveEdit = () => {
    if (
      !draft.itemname.trim() ||
      !draft.prices.length ||
      !draft.prices.every((p) => PRICE_SIZES.includes(p.size) && p.price !== "" && !isNaN(p.price))
    ) {
      alert("Item name and valid prices are required.");
      return;
    }
    if (imgUploading) {
      alert("Please wait until the image finishes uploading.");
      return;
    }
    onEditItem(item._id, draft);
    setEdit(false);
  };

  const pickFile = () => fileRef.current?.click();

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImgUploading(true);
      const data = await uploadToCloudinary(file);
      setDraft((d) => ({ ...d, image: data.secure_url || "" }));
    } catch (err) {
      alert("Image upload failed. Please try again.");
    } finally {
      setImgUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <li className={`p-4 ${edit ? 'bg-sky-50' : 'hover:bg-slate-50'}`}>
      {edit ? (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                     <label className="block text-sm font-medium mb-1.5 text-slate-700">Item Name</label>
                     <input
                        type="text"
                        value={draft.itemname || ""}
                        onChange={(e) => updateField("itemname", e.target.value)}
                        className="w-full border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                     <label className="block text-sm font-medium mb-1.5 text-slate-700">Item Image</label>
                     <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                            {draft.image ? (
                                <img src={draft.image} alt="" className="h-14 w-14 rounded-md object-cover border border-slate-300" />
                            ) : (
                                <div className="h-14 w-14 rounded-md border border-dashed border-slate-300 bg-slate-100" />
                            )}
                            <EditIconButton onClick={pickFile} title="Change image" />
                            <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={onFile} />
                        </div>
                        <input
                            type="url"
                            value={draft.image || ""}
                            onChange={(e) => updateField("image", e.target.value)}
                            placeholder="Or paste image URL"
                            className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Prices</label>
                <div className="space-y-2">
                    {draft.prices.map((price, idx) => (
                    <div key={idx} className="flex gap-2 items-center flex-wrap">
                        <select value={price.size} onChange={(e) => updatePrice(idx, "size", e.target.value)} className="border-slate-300 rounded-md shadow-sm text-sm focus:border-sky-500 focus:ring-sky-500" required>
                            {PRICE_SIZES.map((size) => ( <option key={size} value={size}> {size.charAt(0).toUpperCase() + size.slice(1)} </option> ))}
                        </select>
                        <input type="number" value={price.price} onChange={(e) => updatePrice(idx, "price", e.target.value === "" ? "" : Number(e.target.value))} placeholder="Price" className="w-28 border-slate-300 rounded-md shadow-sm text-sm focus:border-sky-500 focus:ring-sky-500" min="0" step="0.01" required />
                        <button type="button" onClick={() => removePrice(idx)} disabled={draft.prices.length <= 1} className={`flex items-center justify-center h-7 w-7 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 ${draft.prices.length <= 1 ? "opacity-40 cursor-not-allowed" : ""}`} aria-label={`Remove price ${idx + 1}`} >
                            <IconClose />
                        </button>
                    </div>
                    ))}
                </div>
                <button type="button" onClick={addPrice} className="inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 font-semibold mt-3">
                    <IconPlus /> Add price
                </button>
            </div>

            <div className="mt-3 flex gap-3">
                <button className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold text-sm shadow-sm" onClick={saveEdit}> Save Changes</button>
                <button className="px-4 py-1.5 border border-slate-300 bg-white hover:bg-slate-100 rounded-md font-semibold text-sm text-slate-700" onClick={() => { setEdit(false); setDraft(item);}}>
                    Cancel
                </button>
            </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
            {item.image && (
                <img src={item.image} alt="" className="h-12 w-12 rounded-md object-cover border border-slate-200 bg-slate-100 flex-shrink-0" loading="lazy" />
            )}
            <div className="flex-grow min-w-[150px]">
                <div className="font-semibold text-slate-800">{item.itemname}</div>
            </div>
            <div className="flex-grow min-w-[200px] flex flex-wrap gap-2">
                {item.prices.length > 0 ? (
                    item.prices.map((p, i) => (
                    <span key={p._id || i} className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full text-sm font-medium">
                        {p.size !== 'default' && <span>{p.size.charAt(0).toUpperCase() + p.size.slice(1)}: </span>}
                        ₹{p.price}
                    </span>
                    ))
                ) : ( <span className="text-slate-400 italic text-sm">No prices</span> )}
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => setEdit(true)} className="h-9 w-9 flex items-center justify-center rounded-lg text-sky-600 hover:bg-sky-100" title="Edit item" aria-label={`Edit item ${item.itemname}`}>
                    <IconPencil />
                </button>
                <button onClick={() => onDeleteItem(item._id, sectionId)} className="h-9 w-9 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-100" title="Delete item" aria-label={`Delete item ${item.itemname}`}>
                    <IconTrash />
                </button>
            </div>
        </div>
      )}
    </li>
  );
}