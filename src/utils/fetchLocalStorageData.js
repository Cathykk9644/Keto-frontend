export const fetchUser = () => {
  const userItem = localStorage.getItem("user");
  if (userItem && userItem !== "undefined") {
    return JSON.parse(userItem);
  }
  localStorage.removeItem("user"); // Clear invalid user data if it's not correct
  return null; // Return null or a default user structure if not found
};

export const fetchCart = () => {
  const cartItem = localStorage.getItem("cartItems");
  if (cartItem && cartItem !== "undefined") {
    return JSON.parse(cartItem);
  }
  localStorage.removeItem("cartItems"); // Clear invalid cart data if it's not correct
  return []; // Return an empty array if no cart items are found
};
