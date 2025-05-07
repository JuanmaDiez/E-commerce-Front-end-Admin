import axios from "axios";
import {
  CATEGORIES_URL,
  DELETE,
  GET,
  PATCH,
  POST,
} from "../constants/constants";
import { SERVER_ERROR } from "../constants/errorMessages";

async function categoryIndex() {
  let response;

  try {
    response = await axios({
      url: CATEGORIES_URL,
      method: GET,
    });
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    return { success: false, message: errorResponse.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;
  const categories = data.categories;

  return { success: true, categories };
}

async function categoryGet(name) {
  if (!name) return { success: false, message: SERVER_ERROR };

  try {
    response = await axios({
      url: CATEGORIES_URL + "/" + name,
      method: GET,
    });
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    return { success: false, message: errorResponse.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;
  const category = data.category;

  return { success: true, category };
}

async function categoryStore(token, formData) {
  if (!token || !formData) return { success: false, message: SERVER_ERROR };

  try {
    const response = await axios({
      url: CATEGORIES_URL,
      method: POST,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (!response) return { success: false, message: SERVER_ERROR };

    const data = response.data;
    const category = data.category;

    return { success: true, category };
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_UNAUTHORIZED)
      return { success: false, message: UNAUTHORIZED, unauthorized: true };

    return { success: false, message: errorResponse.message };
  }
}

async function categoryEdit(token, id, formData) {
  if (!token || !id || !formData)
    return { success: false, message: SERVER_ERROR };

  try {
    const response = await axios({
      url: CATEGORIES_URL + "/" + id,
      method: PATCH,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (!response) return { success: false, message: SERVER_ERROR };

    const data = response.data;
    const category = data.category;

    return { success: true, category };
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    if (errorResponse.status === STATUS_UNAUTHORIZED)
      return { success: false, message: UNAUTHORIZED, unauthorized: true };

    return { success: false, message: errorResponse.message };
  }
}

async function categoryDelete(token, id) {
  if (!token || !id) return { success: false, message: SERVER_ERROR };

  try {
    const response = await axios({
      url: CATEGORIES_URL + "/" + id,
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

    return { success: false, message: errorResponse.message };
  }
}

export {
  categoryIndex,
  categoryGet,
  categoryStore,
  categoryEdit,
  categoryDelete,
};
