import axios from "axios";
import {
  CATEGORIES_URL,
  DELETE,
  GET,
  PATCH,
  POST,
  STATUS_UNAUTHORIZED,
} from "../constants/constants";
import {
  INSUFFICIENT_DATA,
  SERVER_ERROR,
  UNAUTHORIZED,
} from "../constants/errorMessages";

async function categoryIndex() {
  try {
    const response = await axios({
      url: CATEGORIES_URL,
      method: GET,
    });

    if (!response) return { success: false, message: SERVER_ERROR };

    const data = response.data;
    const categories = data.categories;

    return { success: true, categories };
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    return { success: false, message: errorResponse.message };
  }
}

async function categoryGet(name) {
  if (!name) return { success: false, message: SERVER_ERROR };

  try {
    const response = await axios({
      url: CATEGORIES_URL + "/" + name,
      method: GET,
    });

    if (!response) return { success: false, message: SERVER_ERROR };

    const data = response.data;
    const category = data.category;

    return { success: true, category };
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    return { success: false, message: errorResponse.message };
  }
}

async function categoryStore(
  token,
  name,
  title,
  tip,
  subtitle,
  incentive,
  description,
  image1,
  image2,
  image3
) {
  if (!token || !formData) return { success: false, message: SERVER_ERROR };

  if (
    !name ||
    !title ||
    !tip ||
    !subtitle ||
    !incentive ||
    !description ||
    !image1 ||
    !image2 ||
    !image3
  )
    return { success: false, message: INSUFFICIENT_DATA };

  const formData = new FormData();

  formData.append("name", name);
  formData.append("title", title);
  formData.append("tip", tip);
  formData.append("subtitle", subtitle);
  formData.append("incentive", incentive);
  formData.append("description", description);

  if (image1) {
    formData.append("image1", image1);
  }
  if (image2) {
    formData.append("image2", image2);
  }
  if (image3) {
    formData.append("image3", image3);
  }

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

async function categoryEdit(
  token,
  id,
  name,
  title,
  tip,
  subtitle,
  incentive,
  description,
  image1,
  image2,
  image3
) {
  if (!token || !id) return { success: false, message: SERVER_ERROR };

  const formData = new FormData();

  formData.append("name", name);
  formData.append("title", title);
  formData.append("tip", tip);
  formData.append("subtitle", subtitle);
  formData.append("incentive", incentive);
  formData.append("description", description);

  if (image1) {
    formData.append("image1", image1);
  }
  if (image2) {
    formData.append("image2", image2);
  }
  if (image3) {
    formData.append("image3", image3);
  }

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
