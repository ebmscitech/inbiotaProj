import CONFIG from "../config/index";
// import { getDiariumVersion, getToken, getTokenAPIM, getUserId } from "../utils/storage";
import axios from "axios";
// import { MD5 } from "crypto-js";

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

// axios.defaults.params = {
//   'webVersion': getDiariumVersion()
// };

// Authentication
// export const newLoginAuth = postDiarium(
//   "apim/login"
// );

//GET
export const getHome = get("api/page/home/");
export const getProfile = get("api/page/profile/");
export const getData = get("api/");

//POST
export const postAuth = postParam(
  "api/auth"
);
export const postLogout = post(
  "api/auth/logout"
);
export const postByPath = postParam(
  "api"
);
//POST WITH FILE
export const uploadPhoto = postMultipart(
  `api/upload`
);
// Delete
export const deleteTask = deletePost(
  "gateway/telkom-diarium-timemanagement/2.0/activity"
);
export const deleteByAuth = deleteParam(
  "api"
);

// Put / update / patch
export const updateData = patchParam(
  "api"
);


const API = {
  //get
  getHome,
  getProfile,
  getData,
  //post
  postAuth,
  postByPath,
  postLogout,
  //post with file
  uploadPhoto,
  //delete
  deleteByAuth,
  //update
  updateData,
};

export default API;
