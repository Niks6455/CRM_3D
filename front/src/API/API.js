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

//! регистрация аккаунта
export const GetAllUsers = async () => {
  try {
    const response = await http.get(`${server}/auth/getUsers`);
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! регистрация аккаунта
export const SwitchRoleUser = async (data) => {
  try {
    const response = await http.post(`${server}/auth/svitchRole`, data);
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};




//! Получение списка продуктов 
export const GetAllProduct = async () => {
  try {
    const response = await http.get(`${server}/product`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! Получение всех комментариев
export const GetAllReviews = async () => {
  try {
    const response = await http.get(`${server}/reviews`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! Получение всех заказов
export const GetAllOrders = async () => {
  try {
    const response = await http.get(`${server}/order`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! Получение всех заказов Пользователя
export const GetOrder = async (id) => {
  try {
    const response = await http.get(`${server}/order/${id}`,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! создание заказа
export const CreateOrder = async (data) => {
  try {
    const response = await http.post(`${server}/order`, data,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! создание заказа
export const CreateRewiew = async (data) => {
  try {
    const response = await http.post(`${server}/reviews`, data,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

//! Обновление статуса заказа
export const UpdateOrderStatus = async (data) => {
  try {
    const response = await http.post(`${server}/order/update`, data,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

export const ProdCreate = async (data) => {
  try {
    const response = await http.post(`${server}/product`, data,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

export const UpdateProduct = async (data, id) => {
  try {
    const response = await http.post(`${server}/product/${id}`, data,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

export const UpdatePhoto = async (data) => {
  try {
    const response = await http.post(`${server}/upload`, data,{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

export const GetProductOne = async (id) => {
  try {
    const response = await http.get(`${server}/product/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};

export const DeleteProduct = async (id) => {
  try {
    const response = await http.delete(`${server}/product/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      }
    });
    return response;
  } catch (error) {
    console.log("Произошла ошибка при регистрации") 
 }
};


















