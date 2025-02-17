import axios from "axios";
import {
  NO_CONTENT,
  SERVER_ERROR,
  UNAUTHORIZED
} from "../constants/errorMessages";
import {
  GET,
  ORDERS_URL,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED
} from "../constants/constants";

async function orderIndex(token) {
  if (!token) return { success: false, message: SERVER_ERROR };

  let response;

  try {
    response = await axios({
      url: ORDERS_URL,
      method: GET,
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
      return { success: false, message: NO_CONTENT };

    return { success: false, message: SERVER_ERROR };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const orders = response.data.orders;

  return { success: true, orders };
}

export { orderIndex };
