import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/category/categorySlice";
import post from "../slices/posts/postSlices";
import comment from "../slices/comments/commentSlices";
import accVerification from "../slices/accountVerification/accVerificationSlices";
import weatherSlices from "../slices/weather/weatherSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoriesReducer,
    post,
    comment,
    account:accVerification,
    weather: weatherSlices
  },
});

export default store;
