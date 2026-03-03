// utils/cartUtils.js

export const addToCart = (cart, item, selectedPrice, config = {}) => {
  const {
    idKey = "_id",
    qtyKey = "qty",
  } = config;

  const itemId = item[idKey];

  const existing = cart.find(
    (i) =>
      i[idKey] === itemId &&
      i.selectedPrice.label === selectedPrice.label
  );

  if (existing) {
    return cart.map((i) =>
      i[idKey] === itemId &&
      i.selectedPrice.label === selectedPrice.label
        ? { ...i, [qtyKey]: i[qtyKey] + 1 }
        : i
    );
  }

  return [
    ...cart,
    {
      ...item,
      [idKey]: itemId,
      selectedPrice,
      [qtyKey]: 1,
    },
  ];
};


export const removeFromCart = (cart, itemId, label, config = {}) => {
  const {
    idKey = "_id",
    qtyKey = "qty",
  } = config;

  return cart
    .map((i) =>
      i[idKey] === itemId && i.selectedPrice.label === label
        ? { ...i, [qtyKey]: i[qtyKey] - 1 }
        : i
    )
    .filter((i) => i[qtyKey] > 0);
};