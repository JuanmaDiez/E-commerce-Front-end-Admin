import axios from "axios";
import { CATEGORIES_URL, GET } from "../constants/constants";
import { SERVER_ERROR } from "../constants/errorMessages";

async function categoryIndex() {
  let response;

  try {
    response = await axios({
      url: CATEGORIES_URL,
      method: GET
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

export { categoryIndex };
