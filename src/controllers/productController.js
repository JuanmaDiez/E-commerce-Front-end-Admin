import axios from "axios";
import { GET, PRODUCTS_URL, STATUS_NOT_FOUND } from "../constants/constants";
import { NO_CONTENT, SERVER_ERROR } from "../constants/errorMessages";

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

    return { success: false, message: SERVER_ERROR };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;
  const products = data.products;

  return { success: true, products };
}

export { productIndex };
