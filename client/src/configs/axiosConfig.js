import axios from "axios";

export const AxiosConfig = () => {
  const token = localStorage.getItem(
    `${import.meta.env.VITE_APP_PREFIX_LOCAL}_access_token`
  );
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return instance;
};
