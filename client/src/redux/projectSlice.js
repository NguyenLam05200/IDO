import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Web3 } from "web3";

import ProjectIDO from "../contracts/ProjectIDO.json";
import { resolve } from "styled-jsx/css";
import { reject } from "lodash";
const ganacheUrl = "HTTP://127.0.0.1:7545";
 
export const projectSlice = createSlice({
  name: "project",
  initialState: { projects: [] },
  reducers: {
    initializeState: (state, { payload }) => {
      state.projects = payload.projects ?? [];
    },
    addProject: (state, { payload }) => {
    },
    getProjects: (state) => {
    },
  }
});

// Action creators are generated for each case reducer function
export const { addProject, getProjects, initializeState } = projectSlice.actions;

export default projectSlice.reducer;
