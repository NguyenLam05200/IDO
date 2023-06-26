import { createSlice } from "@reduxjs/toolkit";

import SimpleStorage from "../contracts/SimpleStorage.json";
import { Web3 } from "web3";
const ganacheUrl = "http://localhost:7545";

const getInitState = async () => {
  const provider = new Web3.providers.HttpProvider(ganacheUrl);
  try {
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorage.networks[networkId];

    // Contract instance
    const contract = new web3.eth.Contract(
      SimpleStorage.abi,
      deployedNetwork.address
    );

    // interact with SimpleStorage contract
    const count = await contract.methods.retrieve().call();

    return { methods: contract.methods, projects: Number(count) };
  } catch (error) {
    console.log("Please start Ganache VM blockchain");
    return { methods: null, projects: null };
  }
};

export const projectSlice = createSlice({
  name: "project",
  initialState: await getInitState(),
  reducers: {
    addProject: (state, { payload }) => {
      console.log("________payload: ", payload);
    },
    getProjects: (state) => {
      console.log("getProjects: ");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProject, getProjects } = projectSlice.actions;

export default projectSlice.reducer;
