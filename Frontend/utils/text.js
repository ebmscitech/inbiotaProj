import moment from "moment";

export const toTitleCase = (text) => {
  if (typeof text !== "string") return text;
  text = text.replace(/ /g, " ");
  text = text.replace(/`/g, "'");
  var words = text.toLowerCase().split(" ");

  for (var i = 0; i < words.length; i++) {
    if (words[i][0]) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
  }
  return words.join(" ");
};

export const getInitial = (text) => {
  var words = text.toUpperCase().split(" ");

  for (var i = 0; i < words.length; i++) {
    if (words[i][0]) {
      words[i] = words[i][0];
    }
  }
  return words.join("").replace(/[^A-Z]+/g, "");
};

export function sanitizeText(text = "") {
  var regex = /(<([^>]+)>)/gi;
  var result = text.replace(regex, "");
  // console.log("befor sanitize", text);
  // console.log("after sanitize", result);
  return result;
}

export function textExpire(date) {
  if (date == "9999-01-01") {
    return "Informasi Pribadi ini bisa di akses selamanya";
  } else {
    return `Informasi Pribadi ini bisa di akses sampai tanggal ${moment(
      date,
      "YYYY-MM-DD"
    )
      .locale("id")
      .format("DD MMMM YYYY")}`;
  }
}

export function getTextAfterSpecificChar(text = "example", char = "?id=") {
  if (text && char) {
    const findIndex = text.indexOf(char);
    const afterFound = text.slice(text.indexOf(char) + char.length);
    if (findIndex > -1) {
      return afterFound;
    } else {
      return null;
    }
  } else {
    return null;
  }

  // const afterFound = text.slice(text.indexOf(char) + 3);
  // return afterFound
}
export function getTextBeforeSpecificChar(text, char){
  return text.split(char)[0]
}
export const isValidUrl = urlString=> {
  try { 
    return Boolean(new URL(urlString)); 
  }
  catch(e){ 
    return false; 
  }
}