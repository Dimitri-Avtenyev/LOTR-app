import { Blacklist, Favorite, User } from "../types";

export const getUserInfo = async ():Promise<User> => {
  let userInfo: User = {} as User;
  try {
    let response:Response = await fetch(`${process.env.REACT_APP_API_URL}api/users/user`, {
      method: "GET",
      headers:{"Content-Type":"application/json"},
      credentials: "include"
    });
    if (response.status === 200) {
      
      return userInfo = await response.json() ;

    } else if (response.status === 401 || response.status === 403) {
      console.log(response.statusText);
    }
  } catch (err) {
    console.log(err);
  }
  return userInfo;

}

export const getUserDataFavorites = async(url:string):Promise<Favorite[]> => {
  let data: Favorite[] = [];
  try {
    let response:Response = await fetch(`${url}`, {
      method: "GET",
      headers:{"Content-Type":"application/json"},
      credentials: "include"
    });
    if (response.status === 200) {
      
      return data = await response.json() ;

    } else if (response.status === 401 || response.status === 403) {
      console.log(response.statusText);
    }
  } catch (err) {
    console.log(err);
  }
  return data;
}

export const getUserDataBlackList = async(url:string):Promise<Blacklist[]> => {
  let data: Blacklist[] = [];
  try {
    let response:Response = await fetch(`${url}`, {
      method: "GET",
      headers:{"Content-Type":"application/json"},
      credentials: "include"
    });
    if (response.status === 200) {
      
      return data = await response.json() ;

    } else if (response.status === 401 || response.status === 403) {
      console.log(response.statusText);
    }
  } catch (err) {
    console.log(err);
  }
  return data;
}

export const updateUserData = async (url:string, body:BodyInit):Promise<boolean> => {
  let success:boolean =  false;

  try { 
    let response:Response = await fetch(`${url}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      credentials: "include",
      body: body
    });
    
    if (response.status === 200) {
      return success = true;
    } else if (response.status === 401 || response.status === 403) {
      console.log(response.statusText);
      return success = false;
    }
  } catch (err) {
    console.log(err);
  }
  return success;
}

export const deleteUserData = async (url:string):Promise<boolean> => {
  let success:boolean =  false;

  try { 
    let response:Response = await fetch(`${url}`, {
      method: "DELETE",
      headers: {"Content-Type":"application/json"},
      credentials: "include",
    });
    
    if (response.status === 200) {
      return success = true;
    } else if (response.status === 401 || response.status === 403) {
      console.log(response.statusText);
      return success = false;
    }
  } catch (err) {
    console.log(err);
  }
  return success;
}
