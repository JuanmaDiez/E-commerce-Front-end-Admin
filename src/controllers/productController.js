import axios from "axios";
import {
  DELETE,
  GET,
  PATCH,
  POST,
  PRODUCTS_URL,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
} from "../constants/constants";
import {
  INSUFFICIENT_DATA,
  NO_CONTENT,
  SERVER_ERROR,
  UNAUTHORIZED,
} from "../constants/errorMessages";

async function productIndex() {
  let response;

  try {
    response = await axios({
      url: PRODUCTS_URL,
      method: GET,
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

async function productStore(
  token,
  name,
  description,
  category,
  price,
  stock,
  image,
  featured
) {
  if (!token) return { success: false, message: SERVER_ERROR };

  if (
    !name ||
    !description ||
    !category ||
    !price ||
    (!stock && !stock !== 0) ||
    !image
  )
    return { success: false, message: INSUFFICIENT_DATA };

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("image", image);
  formData.append("featured", featured);

  try {
    const response = await axios({
      url: PRODUCTS_URL,
      method: POST,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });

    if (!response) return { success: false, message: SERVER_ERROR };

    const data = response.data;
    const product = data.product;

    return { success: true, product };
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_UNAUTHORIZED)
      return { success: false, message: UNAUTHORIZED, unauthorized: true };

    return { success: false, message: errorResponse.data.message };
  }
}

async function productEdit(
  token,
  id,
  name,
  description,
  category,
  price,
  stock,
  image,
  featured
) {
  if (!token || !id) return { success: false, message: SERVER_ERROR };

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("stock", stock);
  if (image) {
    formData.append("image", image);
  }
  formData.append("featured", featured);

  try {
    const response = await axios({
      url: `${PRODUCTS_URL}/${id}`,
      method: PATCH,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (!response) return { success: false, message: SERVER_ERROR };

    const data = response.data;
    const product = data.product;

    return { success: true, product };
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_UNAUTHORIZED)
      return { success: false, message: UNAUTHORIZED, unauthorized: true };

    if (errorResponse.status === STATUS_NOT_FOUND)
      return {
        success: false,
        message: SERVER_ERROR,
        serverError: true,
      };

    return { success: false, message: errorResponse.data.message };
  }
}

async function productDelete(token, id) {
  if (!token || !id) return { success: false, message: SERVER_ERROR };

  try {
    const response = await axios({
      url: `${PRODUCTS_URL}/${id}`,
      method: DELETE,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) return { success: false, message: SERVER_ERROR };

    return { success: true };
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_UNAUTHORIZED)
      return { success: false, message: UNAUTHORIZED, unauthorized: true };

    if (errorResponse.status === STATUS_NOT_FOUND)
      return { success: false, message: SERVER_ERROR, serverError: true };

    return { success: false, message: errorResponse.data.message };
  }
}

export { productIndex, productStore, productEdit, productDelete };
