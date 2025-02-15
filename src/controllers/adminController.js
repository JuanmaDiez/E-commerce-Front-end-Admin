import axios from "axios";
import { ADMINS_URL, POST } from "../constants/constants";
import { SERVER_ERROR } from "../constants/errorMessages";

async function adminRegister(firstname, lastname, email, password) {
  if (!firstname || !lastname || !email || !password)
    return { success: false, message: SERVER_ERROR };

  let response = null;

  try {
    response = await axios({
      url: ADMINS_URL,
      method: POST,
      data: { firstname, lastname, email, password },
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
      lastname: data.lastname,
    },
  };
}

async function adminLogin(email, password) {}

export { adminRegister };
