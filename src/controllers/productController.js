import axios from "axios";
import {
  DELETE,
  GET,
  PATCH,
  POST,
  PRODUCT_IMAGE_INPUT_NAME,
  PRODUCTS_URL,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED
} from "../constants/constants";
import {
  INSUFFICIENT_DATA,
  NO_CONTENT,
  SERVER_ERROR,
  UNAUTHORIZED
} from "../constants/errorMessages";

async function productIndex() {
  let response;

  try {
    response = await axios({
      url: PRODUCTS_URL,
      method: GET
    });
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_NOT_FOUND)
      return { success: false, message: NO_CONTENT };

    return { success: false, message: errorResponse.data.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;
  const products = data.products;

  return { success: true, products };
}

async function productStore(token, formData) {
  if (!token || !formData) return { success: false, message: SERVER_ERROR };

  for (const value of formData.values()) {
    if (!value) return { success: false, message: INSUFFICIENT_DATA };
  }

  if (!formData.get(PRODUCT_IMAGE_INPUT_NAME).name)
    return { success: false, message: INSUFFICIENT_DATA };

  let response;

  try {
    response = await axios({
      url: PRODUCTS_URL,
      method: POST,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
      data: formData
    });
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_UNAUTHORIZED)
      return { success: false, message: UNAUTHORIZED, unauthorized: true };

    return { success: false, message: errorResponse.data.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;
  const product = data.product;

  return { success: true, product };
}

async function productEdit(token, id, formData) {
  if (!token || !id || !formData)
    return { success: false, message: SERVER_ERROR };

  let response;

  try {
    response = await axios({
      url: `${PRODUCTS_URL}/${id}`,
      method: PATCH,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      data: formData
    });
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_UNAUTHORIZED)
      return { success: false, message: UNAUTHORIZED, unauthorized: true };

    if (errorResponse.status === STATUS_NOT_FOUND)
      return {
        success: false,
        message: SERVER_ERROR,
        serverError: true
      };

    return { success: false, message: errorResponse.data.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;
  const product = data.product;

  return { success: true, product };
}

async function productDelete(token, id) {
  if (!token || !id) return { success: false, message: SERVER_ERROR };

  let response;

  try {
    response = await axios({
      url: `${PRODUCTS_URL}/${id}`,
      method: DELETE,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_UNAUTHORIZED)
      return { success: false, message: UNAUTHORIZED, unauthorized: true };

    if (errorResponse.status === STATUS_NOT_FOUND)
      return { success: false, message: SERVER_ERROR, serverError: true };

    return { success: false, message: errorResponse.data.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  return { success: true };
}

export { productIndex, productStore, productEdit, productDelete };
