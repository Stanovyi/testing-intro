function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('quantity must be > 0');
  }

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    const newQty = existing.quantity + quantity;
    if (newQty > product.stock) {
      throw new RangeError('not enough stock');
    }

    return cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
  }

  if (quantity > product.stock) {
    throw new RangeError('not enough stock');
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError('quantity must be > 0');
  }

  const item = cart.find((item) => item.id === productId);
  if (!item) {
    return cart;
  }

  if (quantity > item.stock) {
    throw new RangeError('not enough stock');
  }

  return cart.map((item) => {
    if (item.id === productId) {
      return { ...item, quantity };
    }
    return item;
  });
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].price * cart[i].quantity;
  }
  return sum;
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }

  let delivery = 30000;
  if (subtotal >= 50000) {
    delivery = 0;
  }

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
