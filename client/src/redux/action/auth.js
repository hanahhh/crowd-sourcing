import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosConfig } from "../../configs/axiosConfig";
import axios from "axios";

export const userLogin = createAsyncThunk(
  `user/login`,
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/auth/login`,
        data
      );
      localStorage.setItem(
        `${import.meta.env.VITE_APP_PREFIX_LOCAL}_access_token`,
        res.data.jwt
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
