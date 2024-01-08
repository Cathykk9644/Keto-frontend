export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
  ADD_TO_CART: "ADD_TO_CART",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    case actionType.ADD_TO_CART:
      // check if the item is already in the cart
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const newCartItems = [...state.cartItems];

      if (existingCartItemIndex >= 0) {
        // Item already exists in the cart, update the quantity
        newCartItems[existingCartItemIndex] = {
          ...newCartItems[existingCartItemIndex],
          quantity: newCartItems[existingCartItemIndex].quantity + 1,
        };
      } else {
        // Item not in the cart, add as new item
        newCartItems.push({ ...action.payload, quantity: 1 });
      }

      return {
        ...state,
        cartItems: newCartItems,
      };

    default:
      return state;
  }
};

export default reducer;
