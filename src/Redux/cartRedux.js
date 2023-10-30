import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      if (action.payload && action.payload.price) {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },

    removeProducts: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },

    addCartProduct: (state, action) => {
      if (action.payload) {
        state.quantity += action.payload.quantity;

        // Replace the entire 'products' array with the new array
        action.payload.products.forEach((product) => {
          state.products.push(product);
        });

        state.total += action.payload.total;
      }
    },

    updateProductQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productToUpdate = state.products.find(
        (product) => product._id === productId
      );
      if (productToUpdate) {
        // Update the product's quantity
        const oldQuantity = productToUpdate.quantity;
        productToUpdate.quantity = newQuantity;

        // Update the total price
        state.total += (newQuantity - oldQuantity) * productToUpdate.price;
      }
    },
  },
});

//exporting the action
export const {
  addProduct,
  updateProductQuantity,
  removeProducts,
  addCartProduct,
} = cartSlice.actions;

//exporting reducer to the store dunction of the redux as we will use it there then from the store we could use it anywhere
export default cartSlice.reducer;
//for deafult exports we dosent specify the name of the export thats why its deafult we can name it anything while importing from this file
