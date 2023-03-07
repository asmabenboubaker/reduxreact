import { createSlice } from "@reduxjs/toolkit";
import { getallProducts } from "../../service/api";
const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], selectedProduct: null, errors: null },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
   
    deleteProductReducer: (state, action) => {
      const payload = action.payload;
      const index = state.products.findIndex((item) => item.id === payload);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    updateProductReducer: (state, action) => {
      const payload = action.payload;
      const index = state.products.findIndex(
        (item) => item.id === payload.id
      );
      if (index !== -1) {
        state.products[index] = payload;
      }
    },
    addProductReducer: (state, action) => {
      const newProduct = action.payload;
      state.products.push(newProduct);
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
},
});
export const fetchProducts = () => async (dispatch) => {
    getallProducts()
        .then((response)=>{dispatch(populateProducts(response.data));dispatch(setErrors(null))})
        .catch((error)=>dispatch(setErrors(error)));

};

export const {
  populateProducts,
  selectProduct,
  unselectProduct,
  setErrors,
  deleteProductReducer,
  updateProductReducer,
  addProductReducer,
  setProducts
} = productsSlice.actions;
export default productsSlice.reducer;

