// slices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  level:"",
  age: "",
  height: "",
  weight: "",
  gender: "",
  activity: "",
  goal: "",
};

export const userInfoSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setLevelValue: (state, action) => {
      state.level = action.payload;
    },
    setAgeValue: (state, action) => {
      state.age = action.payload;
    },
    setheightValue: (state, action) => {
      state.height = action.payload;
    },
    setWeightValue: (state, action) => {
      state.weight = action.payload;
    },
    setGenderValue: (state, action) => {
      state.gender = action.payload;
    },
    setActivityValue: (state, action) => {
      state.activity = action.payload;
    },
    setGolValue: (state, action) => {
      state.goal = action.payload;
    },
  },
});

export const {
  setLevelValue,
  setAgeValue,
  setheightValue,
  setWeightValue,
  setGenderValue,
  setActivityValue,
  setGolValue,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
