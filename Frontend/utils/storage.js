const TOKEN_STORAGE = "_asp_at";
const USER_DATA_STORAGE = "_asp_ud";
const DEVICE_INFORMATION = "_asp_di";

import { noValue } from './validateInput';
import CONFIG from '../config'
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

function encodeData(value) {
  return AES.encrypt(value, CONFIG.captchaSiteKey).toString();
}
function decodeData(value) {
  var bytes = AES.decrypt(value, CONFIG.captchaSiteKey);
  return bytes.toString(enc);
}
// Check if the code is being executed in the browser or not
const isBrowser = typeof window !== "undefined";

export function setStorage(KEY, VAL) {
  if (isBrowser) {
    localStorage.setItem(KEY, VAL);
  }
}

export function getStorage(KEY) {
  return isBrowser ? localStorage.getItem(KEY) : null;
}

export function eraseStorage(KEY) {
  if (isBrowser) {
    localStorage.removeItem(KEY);
  }
}

// export function setStorage(KEY, VAL) {
//   localStorage.setItem(KEY, VAL);
// }

// export function getStorage(KEY) {
//   return localStorage.getItem(KEY);
// }

// export function eraseStorage(KEY) {
//   localStorage.removeItem(KEY);
// }

// export function setCookie(KEY, VAL, HOUR) {
//   var expires = "";
//   if (HOUR) {
//     var date = new Date();
//     date.setTime(date.getTime() + HOUR * 60 * 60 * 1000);
//     expires = "; Expires=" + date.toUTCString();
//     // token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmQ3MmNkNWNiZGFkYTgwNWE1ZWU1YyIsImlhdCI6MTY5ODc0MjQ2MX0.QGaCDHVdXElDFaETYRx2J9bjANiGI4q-uC4ZWqdmLco; Path=/; HttpOnly; Expires=Tue, 31 Oct 2023 09:54:21 GMT;
//   }
//   // document.cookie = KEY + "=" + (VAL ? encodeData(VAL) : "") + expires + "; path=/";
//   document.cookie = KEY + "=" + (VAL ? VAL : "") + "; Path=/" + "; HttpOnly" + expires;
// }

export function setCookie(val, hour) {
  const expires = hour ? new Date(Date.now() + hour * 60 * 60 * 1000).toUTCString() : "";

  // Set the token cookie
  document.cookie = `token=${val}; Path=/; HttpOnly; Expires=${expires}`;

  // Set the connect.sid cookie
  document.cookie = `connect.sid=${val}; Path=/; HttpOnly; Expires=${expires}`;
}

export function getCookie(KEY) {
  var nameEQ = KEY + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.length > 0 ? decodeData(c.substring(nameEQ.length, c.length)) : null
  }
  return null;
}

export function eraseCookie(KEY) {
  document.cookie = KEY + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function setToken(value) {
  setCookie(TOKEN_STORAGE, value, 8);
}
// export function setUserData(value) {
//   setCookie(USER_DATA_STORAGE, value, 24);
// }

export function setUserData(value) {
  setStorage(USER_DATA_STORAGE, JSON.stringify(value));
}

export function setUserDevice(value) {
  setCookie(DEVICE_INFORMATION, JSON.stringify(value), 8);
}

// export function getUsername() {
//   var userData = getUserData()
//   return userData.username
// }
export function getUsername() {
  var userData = getUserData();
  if (userData && userData.username) {
    return userData.username;
  } else {
    return '';
  }
}

export function getPhotoProfile() {
  var userData = getUserData();
  if (userData && userData.profile_picture) {
    return userData.profile_picture;
  } else {
    return '';
  }
}

export function getUserRole() {
  var userData = getUserData();
  if (userData && userData.role) {
    return userData.role;
  } else {
    return '';
  }
}

// export function getUserRole() {
//   var userData = getUserData()
//   return userData.role
// }

export function getUserData() {
  return JSON.parse(getStorage(USER_DATA_STORAGE))
}
// export function getUserData() {
//   return JSON.parse(getCookie(USER_DATA_STORAGE) || '{}')
// }

export function getUserDevice() {
  return JSON.parse(getCookie(DEVICE_INFORMATION) || '{}')
}

export function getUserId() {
  var userData = getUserData();
  if (userData && userData.id_user) {
    return userData.id_user;
  } else {
    return '';
  }
}

export function isSessionActive() {
  var userData = getUserData();
  var mfa = getUserMFA();
  if (mfa == "1") {
    return !noValue(userData)
  } else {
    return false
  }
}

export function clearStorages() {
  if (isBrowser) {
    eraseCookie(TOKEN_STORAGE);
    eraseCookie(USER_DATA_STORAGE);
    eraseCookie(DEVICE_INFORMATION);
    localStorage.removeItem(USER_DATA_STORAGE);
  }
}
