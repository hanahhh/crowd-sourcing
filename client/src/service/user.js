import axios from "axios";
import { AxiosConfig } from "../configs/axiosConfig";

export function register(data, callback) {
  axios
    .post(`${import.meta.env.VITE_APP_API}/auth/register`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}

export function login(data, callback) {
  axios
    .post(`${import.meta.env.VITE_APP_API}/auth-user/login`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}

export const getAllWorker = (pagination, filters, sort, callback) => {
  const axios = AxiosConfig();
  let api = `/users?populate=role&filters[role][name][$eq]=worker`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const searchWorker = (keyword, pagination, filters, sort, callback) => {
  const axios = AxiosConfig();
  let api = `/users?populate=role&filters[role][name][$eq]=worker&filters[username][$contains]=${keyword}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
