import CONFIG from "../config/index";
import axios from "axios";

const isDev = process.env.NODE_ENV !== "production" ? true : false

const fullURL = (path) => {
  return `${CONFIG.API_URL}/${path}`;
};

const post = (api) => (data) => {

  return axios.post(fullURL(api), data, {
    method: "POST",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      // Authorization: `Bearer ${token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
  });
};

const postMultipart = (api) => (data) => {

  return axios.post(fullURL(api), data, {
    method: "POST",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "multipart/form-data",
      // Authorization: `Bearer ${token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
  });
};

const postParam = (api) => (data, param = "") => {

  return axios.post(`${fullURL(api)}${param}`, data, {
    method: "POST",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      // Authorization: `Bearer ${token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
  });
};

const get = (api) => (param = "") => {
  return axios(`${fullURL(api)}${param}`, {
    method: "GET",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      "ClientId": "8ee35d248080a0f740eb4499698f0dcc60e90ff9"
      // Authorization: `Bearer ${token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
  });
};


const patchParam = (api) => (data, param = "") => {
  return axios.patch(`${fullURL(api)}${param}`, data, {
    method: "PATCH",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "Content-type": "application/json",
      // Authorization: `Bearer ${token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
  });
};

const deletePost = (api) => (data) => {

  return axios.delete(fullURL(api), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      // Authorization: `Bearer ${token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
    data
  });
};

const deleteParam = (api) => (param = '') => {

  return axios.delete(`${fullURL(api)}${param}`, {
    method: "DELETE",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      // Authorization: `Bearer ${token}`,
      // 'apikey': process.env.REACT_APP_API_KEY
    },
  });
};

axios.interceptors.response.use(
  response => response,
  error => {
    const { response } = error

    if (response && response.status === 401) {
      // if (window.location.pathname !== "/login" && window.location.pathname !== "/loading"){
      //   clearStorages()
      //   window.location.href = "/login";
      // }
      console.log("API_401", response);
    }
    return Promise.reject(error)
  }
)

//GET
export const getSearch = get("api/search");

//POST
export const postAuth = postParam(
  "api/users"
);
export const postLogout = post(
  "api/auth/logout"
);
export const postByPath = postParam(
  "api"
);
//POST WITH FILE
// Delete

// Put / update / patch
export const updateData = patchParam(
  "api"
);


const API = {
  //get
  getSearch,
  //post
  postAuth,
  postByPath,
  postLogout,
  //post with file
  //delete
  //update
  updateData,
};

export default API;
