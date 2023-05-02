import CryptoJS from "crypto-js";

export const salt = ():string => {
  return CryptoJS.lib.WordArray.random(16).toString();
}

export const hash = (password:string, salt:string):string => {
  return CryptoJS.PBKDF2(password, salt, {iterations: 1000}).toString();
}
