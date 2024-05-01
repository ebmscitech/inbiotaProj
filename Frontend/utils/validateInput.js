import { fileAccept, getByte } from './format';
import { toTitleCase } from "./text";
import moment from "moment";

const regexEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
const regexUserName = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export default function validateInput(value, rules) {
  if (rules.find(i => i === 'required' && noValue(value)))
    return 'Harus diisi';
  if (rules.find(i => i === 'valid-number' && isNaN(Number(value))))
    return 'Data harus berisi angka';
  if (rules.find(i => i === 'valid-email' && !regexEmail.test(value)))
    return 'Format email salah';
  if (rules.find(i => i === 'valid-user' && !regexUserName.test(value)))
    return 'Pastikan gunakan username yang sesuai saat registrasi';
  if (rules.find(i => i === 'valid-password' && !regexPassword.test(value)))
    return 'Password harus memiliki minimal 8 karakter dan harus berisi huruf kapital serta angka';
  if (rules.find(i => i.includes('min-length') && value.length < Number(i.replace(/[^0-9,]+/g, ''))))
    return `Karakter harus lebih dari ${Number(rules.find(i => i.includes('min-length')).replace(/[^0-9,]+/g, ''))}`;
  if (rules.find(i => i.includes('max-length') && value.length > Number(i.replace(/[^0-9,]+/g, ''))))
    return `Karakter jangan lebih dari ${Number(rules.find(i => i.includes('max-length')).replace(/[^0-9,]+/g, ''))}`;
  if (rules.find(i => i.includes('min-value') && value < Number(i.replace(/[^0-9,]+/g, ''))))
    return `Nilai minimal adalah ${Number(rules.find(i => i.includes('min-value')).replace(/[^0-9,]+/g, ''))}`;
  if (rules.find(i => i.includes('max-value') && value > Number(i.replace(/[^0-9,]+/g, ''))))
    return `Nilai maksimal adalah ${Number(rules.find(i => i.includes('max-value')).replace(/[^0-9,]+/g, ''))}`;
  if (rules.find(i => i.includes('password-match') && !matchVal(i, value)))
    return `Password tidak sama, silahkan ketik ulang`;
  if (rules.find(i => i.includes('min-size') && value && value[0] && (value[0].size/1024) < Number(i.replace(/[^0-9,]+/g, ''))))
    return (
      `Ukuran file tidak boleh kurang dari 
      ${getByte(Number(rules.find(i => i.includes('min-size')).replace(/[^0-9,]+/g, '')))}`
    );
  if (rules.find(i => i.includes('max-size') && value && value[0] && (value[0].size/1024) > Number(i.replace(/[^0-9,]+/g, ''))))
    return (
      `Ukuran file tidak boleh lebih dari 
      ${getByte(Number(rules.find(i => i.includes('max-size')).replace(/[^0-9,]+/g, '')))}`
    );
  if (rules.find(i => i.includes('file-accept') && value && value[0] && !valAccept(i, value[0].type)))
    return (
      `File harus dalam format ${getRules(rules.find(i => i.includes('file-accept')))}`
    );
  return '';
}

export function noValue(val) {
  var result = (!val);
  if (!result){
    if (Array.isArray(val)) {
      result = val.length > 0 ? false : true;
    } 
    if (typeof val === "object"){
      result = Object.keys(val).length > 0 ? false : true;
    }
  }
  return result;
}

export function matchVal(str, val) {
  const matches = str.match(/\((.*?)\)/);

  if (matches) {
    return (matches[1] === val);
  } else {
    return false;
  }
}

export function matchArrayString(Arr1 = [], Arr2 = []) {
  if (Arr1.length == Arr2.length){
    let result = true;

    Arr1.map((val) => {
      if (Arr2.indexOf(val) > -1) {
        result = result && true
      } else {
        result = false
      }
    })
    return result
  }
  return false
}

export const isSameDate = (date1, date2, format = null) => {
  let isSame = false
  if (format) {
    date1 = moment(date1, format).toDate()
    date2 = moment(date2, format).toDate()
  }

  if (moment(date1).diff(date2, 'seconds') == 0){
    isSame = true
  }

  return isSame
}

export function valAccept(str, val) {
  const matches = str.match(/\((.*?)\)/);
  if (matches) {
    const arrMatch = matches[1].split(',');
    return arrMatch.includes(val);
  } else {
    return false;
  }
}

export function getRules(val) {
  const matches = val.match(/\((.*?)\)/);
  const fileaccept = fileAccept(matches[1].split(','));
  return fileaccept;
}

export function compareTime(val1, val2) {
  let result = false;
  const time1 = val1.toString().split(":");
  const time2 = val2.toString().split(":");

  if (parseInt(time1[0]) > parseInt(time2[0])) {
    result = true;
  } else if (
    parseInt(time1[0]) == parseInt(time2[0]) &&
    parseInt(time1[1]) > parseInt(time2[1])
  ) {
    result = true;
  }

  return result;
};

export function isStringValidDate(str, format) {
  var nospaceStr = String(str).replace(/ /g, "");
  var strsplit = nospaceStr.split("-");
  var formatsplit = format.split("-");
  var valid = false;

  if (
    nospaceStr.length == format.length &&
    strsplit.length == formatsplit.length
  ) {
    valid = true;
    for (var i = 0; i < formatsplit.length; i++) {
      valid = valid && strsplit[i].length == formatsplit[i].length;
    }
    if (valid) valid = moment(nospaceStr, format).isValid();
  }

  return valid;
};

export function getStartEndLabel(start, end) {
  var startArr = start.split(" ");
  var endArr = end.split(" ");
  var result = "";

  if (start != end) {
    start = "";
    end = "";
    for (var i = 0; i < startArr.length; i++) {
      if (startArr[i] != endArr[i]) {
        start = i == 0 ? startArr[i] : `${start} ${startArr[i]}`;
      }
      end = i == 0 ? endArr[i] : `${end} ${endArr[i]}`;
    }
    result = `${start} - ${end}`;
  } else {
    result = end;
  }
  return result;
};

export function hasValidValue(val) {
  var result = (val);
  if (result){
    if(Array.isArray(val)){
      result = val.length > 0;
    } else if (typeof val === "number"){ 
      result = val > 0;
    } else  if (typeof val === "string"){ 
      result = val !== "" && val !== "-"
    } else if(typeof val === "object"){
      result = Object.keys(val).length > 0;
    }
  }
  return result;
};

export const isURI = (text) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  var result = text.replace(urlRegex, function (url) {
    return "true";
  });
  return (result === "true");
};

//OKR
export function validAssignee(val) {
  val = String(val);
  if (val.charAt(val.length - 1) == " ") {
    val = val.slice(0, -1);
  }
  if (val.charAt(0) == " ") {
    val = val.substring(1);
  }

  var result = false;

  if (val.replace(/[a-zA-Z0-9]/g, "") == "") {
    result = true;
  }

  return result;
};

export function validKodifikasi(str, format) {
  var kodifikasi = String(str).split(".");
  var formatsplit = String(format).split(".");
  var valid = false;

  if (kodifikasi.length == formatsplit.length) {
    valid = true;
  }

  return valid;
};

export function isPeriodeRepetitif(val) {
  return val.indexOf(",") > -1;
};

export function isPeriodeKontinue(val) {
  return val.indexOf("-") > -1;
};

export function getOKRStatus(percent = 0, closeStatus, statusAPI) {
  var result = {
    color: "red-500",
    colorChart: "#f56565",
    text: "No Progress",
    tooltips: null,
    tooltipsText: "",
    img: ""
  };

  if (statusAPI) {
    if (statusAPI.status == "done" || closeStatus == 1) {
      result.color = "blue-500";
      result.colorChart = "#4299e1";
      statusAPI.status = "closed";
    } else if (statusAPI.status == "late") {
      result.color = "yellow-500";
      result.colorChart = "#eed74f";
    } else if (statusAPI.status == "on_track") {
      result.color = "green-600";
      result.colorChart = "#55c3b9";
      if (parseInt(percent) == 0) {
        statusAPI.status = "no_progress";
      }
    } else if (statusAPI.status == "no_progress" && parseInt(percent) > 0) {
      result.color = "green-500";
      statusAPI.status = "on_track";
      result.colorChart = "#55c3b9";
    }

    result.tooltips = statusAPI.speed;
    if (result.tooltips == "fast") {
      result.tooltipsText = "Your OKR is on track and faster than expected";
    } else if (result.tooltips == "slow") {
      result.tooltipsText = "Your OKR is on track but slower than expected";
    } else {
      result.tooltipsText = "";
    }
    if (statusAPI.speed) {
      result.img = statusAPI.speed.toLowerCase();
    }
    if (statusAPI.status) {
      result.text = toTitleCase(
        statusAPI.status.replace(/[_]/g, " ")
      );
    } else {
      result.text = "-";
    }
  }
  return result;
};

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the earth in kilometers

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

export function betweenTwoDates(start_date, end_date) {
  const dateNow = new Date();
  const start = new Date(start_date);
  const end = new Date(end_date);
  if (end <= dateNow || (dateNow > start && dateNow < end)) {
    return false
  } else {
    return true
  }
  
}