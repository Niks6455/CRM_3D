import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: "", // Описание заказа
  products: [], // Массив товаров в корзине
  phoneNumber: "",
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Установить описание заказа
    setDescription(state, action) {
      state.description = action.payload;
    },

    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },

    // Добавить товар в корзину
    addProduct(state, action) {
      const { productId, quantity, price } = action.payload;
      const existingProduct = state.products.find((p) => p.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity; // Увеличиваем количество, если товар уже есть
      } else {
        state.products.push({ productId, quantity, price });
      }
    },

    // Обновить количество товара в корзине
    updateProductQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const product = state.products.find((p) => p.productId === productId);

      if (product) {
        product.quantity = quantity;
      }
    },

    // Удалить товар из корзины
    removeProduct(state, action) {
      state.products = state.products.filter((p) => p.productId !== action.payload);
    },

    // Очистить корзину
    clearBasket(state) {
      state.description = "";
      state.products = [];
    },
  },
});

export const {
  setDescription,
  addProduct,
  updateProductQuantity,
  removeProduct,
  clearBasket,
  setPhoneNumber
} = basketSlice.actions;

export default basketSlice.reducer;
