const API_URL = process.env.REACT_APP_API_URL;

const POST = "POST";
const GET = "GET";
const PATCH = "PATCH";
const DELETE = "DELETE";

const ADMINS_URL = API_URL + "/admins";
const ORDERS_URL = API_URL + "/orders";
const PRODUCTS_URL = API_URL + "/products";
const LOGIN_URL = "/login";

const STATUS_UNAUTHORIZED = 401;
const STATUS_NOT_FOUND = 404;

export {
  POST,
  GET,
  PATCH,
  DELETE,
  ADMINS_URL,
  ORDERS_URL,
  PRODUCTS_URL,
  LOGIN_URL,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_FOUND
};
