import axios from "axios";
const { REACT_APP_APP_URL } = process.env;
const baseUrl = REACT_APP_APP_URL;

const API = axios.create({ baseURL: baseUrl });
const headers = {
  "Content-Type": "application/json",
};

export const addUser = async data => {
  const res = await API.post("/users/addUser", data).catch(err => {
    if (err.response) {
      return err.response;
    }
  });
  return res;
};

export const loginUser = async data => {
  const res = await API.post("/users/loginUser", data).catch(err => {
    if (err.response) {
      return err.response;
    }
  });
  return res;
};

export const addProfilePic = async data => {
  const res = await API.post("/users/addProfilePic", data).catch(err => {
    if (err.response) {
      return err.response;
    }
  });
  return res;
};

//chat route

export const startChat = async payload => {
  const res = await API.post("/chats/startChat", payload, { headers: headers }).catch(err => {
    if (err.response) {
      return err.response;
    }
  });
  return res;
};
