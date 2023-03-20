import { createSlice } from "@reduxjs/toolkit";
import { getAllServices } from "../action/service";

const initialState = {
  data: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllServices.pending, (state) => {});
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      let data = action.payload.data;
      data = data.map((service, index) => {
        return {
          label: service.attributes.name,
          value: service.id,
        };
      });
      state.data = data;
    });

    builder.addCase(getAllServices.rejected, (state, action) => {
      console.log(action.payload);
      state.data = null;
    });
  },
});

const { reducer, actions } = serviceSlice;

export default serviceSlice.reducer;
