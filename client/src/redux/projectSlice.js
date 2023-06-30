import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Web3 } from "web3";

import ProjectIDO from "../contracts/ProjectIDO.json";
const ganacheUrl = "HTTP://127.0.0.1:7545";

export const projectSlice = createSlice({
  name: "project",
  initialState: { projects: [] },
  reducers: {
    initializeState: (state, { payload }) => {
      state.projects = payload.projects ?? [];
    },
    addProject: (state, { payload }) => {},
    getProjects: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addProject, getProjects, initializeState } =
  projectSlice.actions;

export default projectSlice.reducer;

export const getProjectDetails = async ({ projectId }, cb) => {
  if (!projectId) return null;

  let provider = window.ethereum;
  let selectedAccount;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then(async (accounts) => {
        selectedAccount = accounts[0];

        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ProjectIDO.networks[networkId];

        // Contract instance
        const contract = new web3.eth.Contract(
          ProjectIDO.abi,
          deployedNetwork.address
        );
        const projectDetails = await contract.methods
          .getProjectDetails(projectId)
          .call();

        console.log("________-projectDetails: ", projectDetails);

        const formattedProject = {
          projectId: Number(projectId),
          createdBy: projectDetails[0],
          title: projectDetails[1],
          description: projectDetails[2],
          minContribute: Number(projectDetails[3]),
          raiseTarget: Number(projectDetails[4]),
          contributorAddresses: projectDetails[5],
          totalContributedETH: Number(projectDetails[6]) / 10 ** 18,
          tokenAddress: projectDetails[7],
        };

        cb(formattedProject);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }
};

export const contribute = async (projectId, amount) => {
  console.log("___________amount: ", amount);
  let provider = window.ethereum;
  const web3 = new Web3(provider);
  try {
    if (typeof provider !== "undefined") {
      await provider.request({
        method: "eth_requestAccounts",
      });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ProjectIDO.networks[networkId];

      // Contract instance
      const contract = new web3.eth.Contract(
        ProjectIDO.abi,
        deployedNetwork.address
      );

      const invested = await contract.methods
        .invest(projectId)
        .send({ from: account, value: Web3.utils.toWei(amount, "ether") });

      return invested;
    }
  } catch (e) {
    console.log("____e: ", e);
    if (e.code === 100) {
      //user rejected the transaction
      console.log("user rejected the transaction");
    }
  }
};

export const withdrawFunds = async (projectId, amount, reason) => {
  console.log("___________amount: ", amount);
  let provider = window.ethereum;
  const web3 = new Web3(provider);
  try {
    if (typeof provider !== "undefined") {
      await provider.request({
        method: "eth_requestAccounts",
      });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ProjectIDO.networks[networkId];

      // Contract instance
      const contract = new web3.eth.Contract(
        ProjectIDO.abi,
        deployedNetwork.address
      );

      const withdrawRequest = await contract.methods
        .withdrawFunds(projectId, Web3.utils.toWei(amount, "ether"), reason)
        .send({ from: account });

      return withdrawRequest;
    }
  } catch (e) {
    console.log("____e: ", e);
    if (e.code === 100) {
      //user rejected the transaction
      console.log("user rejected the transaction");
    }
  }
};
