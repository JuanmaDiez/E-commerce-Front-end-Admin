import axios from "axios";
import {
  ADMINS_URL,
  DELETE,
  GET,
  LOGIN_URL,
  POST,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED
} from "../constants/constants";
import {
  NO_CONTENT,
  SERVER_ERROR,
  UNAUTHORIZED
} from "../constants/errorMessages";

async function adminRegister(firstname, lastname, email, password) {
  if (!firstname || !lastname || !email || !password)
    return { success: false, message: SERVER_ERROR };

  let response = null;

  try {
    response = await axios({
      url: ADMINS_URL,
      method: POST,
      data: { firstname, lastname, email, password }
    });
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const response = error.response;

    return { success: false, message: response.data.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;

  return {
    success: true,
    token: data.token,
    admin: {
      id: data.id,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname
    }
  };
}

async function adminLogin(email, password) {
  if (!email || !password) return { success: false, message: SERVER_ERROR };

  let response;

  try {
    response = await axios({
      url: ADMINS_URL + LOGIN_URL,
      method: POST,
      data: { email, password }
    });
  } catch (error) {
    if (!error.response) return { success: false, message: SERVER_ERROR };

    const errorResponse = error.response;

    return { success: false, message: errorResponse.data.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;
  const token = data.token;
  const admin = data.admin;

  return { success: true, admin, token };
}

async function adminIndex(token) {
  if (!token) return { success: false, message: SERVER_ERROR };

  let response;

  try {
    response = await axios({
      url: ADMINS_URL,
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

    return { success: false, message: errorResponse.data.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  const data = response.data;
  const admins = data.admins;

  return { success: true, admins };
}

async function adminDelete(token, id) {
  if (!id || !token) return { success: false, message: SERVER_ERROR };

  let response;

  try {
    response = await axios({
      url: `${ADMINS_URL}/${id}`,
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

    return { success: false, message: errorResponse.data.message };
  }

  if (!response) return { success: false, message: SERVER_ERROR };

  return { success: true };
}

export { adminRegister, adminLogin, adminIndex, adminDelete };
