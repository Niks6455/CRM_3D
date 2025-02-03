import axios from "axios";
const http = axios.create({
  withCredentials: true,
});
const server = process.env.REACT_APP_API_URL;


//! Запрос на авторизацию
export const LoginFunc = async (UserData) => {
  try {
    const response = await http.post(`${server}/auth/login`, UserData);
    const { token, ...userData } = response.data;
    console.log("token", token)
    console.log("response", response)
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    return response;
  } catch (error) {
     console.log("Произошла ошибка при авторизации") 
  }
};

//! регистрация аккаунта
export const RegisterFunc = async (UserData) => {
  try {
    const response = await http.post(`${server}/auth/registration`, UserData);
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! Получение списка продуктов 
export const GetAllProduct = async () => {
  try {
    const response = await http.get(`${server}/product`);
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! Получение всех комментариев
export const GetAllReviews = async () => {
  try {
    const response = await http.get(`${server}/reviews`);
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! Получение всех заказов
export const GetAllOrders = async () => {
  try {
    const response = await http.get(`${server}/order`);
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! Получение всех заказов Пользователя
export const GetOrders = async (id) => {
  try {
    const response = await http.get(`${server}/order/${id}`);
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! создание заказа
export const CreateOrder = async (data) => {
  try {
    const response = await http.post(`${server}/order`, data);
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};







