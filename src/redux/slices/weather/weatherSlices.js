import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_key=import.meta.env.VITE_OPEN_WEATHER_API_KEY;


//Fetch Weather
export const fetchWeatherAction = createAsyncThunk(
  "weather/fetch",
  async (location, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&units=metric&appid=${API_key}`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const weatherSlices = createSlice({
  name: "weather",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
      state.loading = false;
      state.weatherInfo = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchWeatherAction.rejected, (state, action) => {
      state.loading = false;
      state.weatherInfo = undefined;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default weatherSlices.reducer;
