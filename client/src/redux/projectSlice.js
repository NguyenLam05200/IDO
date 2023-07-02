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

export const formatDetailProject = (projectId, projectDetails) => {
  return {
    projectId: Number(projectId),
    createdBy: projectDetails[0],
    title: projectDetails[1],
    description: projectDetails[2],
    minContribute: Web3.utils.fromWei(projectDetails[3], "ether"),
    raiseTarget: Web3.utils.fromWei(projectDetails[4], "ether"),
    contributorAddresses: projectDetails[5],
    totalContributedETH: Number(projectDetails[6]) / 10 ** 18,
    tokenAddress: projectDetails[7],
    tokenName: projectDetails[8],
    tokenSymbol: projectDetails[9],
    tokenImage: projectDetails[10],
    isCompleted: projectDetails[11],
  };
};

export const formatRequest = (input) => {
  return {
    requester: input[0],
    amount: Web3.utils.fromWei(input[1], "ether"),
    reason: input[2],
    time: Number(input[3]),
  };
};

function extractErrorMessage(errorString) {
  try {
    const start = errorString.indexOf('reason":"') + 9;
    const end = errorString.indexOf('"', start);
    const errorMessage = errorString.slice(start, end);

    return errorMessage;
  } catch (error) {
    return "Somthing wrong!";
  }
}

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

        const formattedProject = formatDetailProject(projectId, projectDetails);
        console.log("_____formattedProject: ", formattedProject);
        cb(formattedProject);
      })
      .catch((err) => {
        console.log(typeof err, err);
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
    console.log("____e: ", extractErrorMessage(e.message));
    return { isError: true, reason: extractErrorMessage(e?.message) };
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
    return { isError: true, reason: extractErrorMessage(e?.message) };
  }
};

export const getProjectRequest = async (projectId, cb) => {
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
        const projectRequests = await contract.methods
          .getWithdrawalRequests(projectId)
          .call();
        console.log("____projectRequests: ", projectRequests);
        if (!projectRequests || projectRequests.length === 0) return [];

        const listFormated = [];
        for (const request of projectRequests) {
          console.log("____request: ", request);
          listFormated.push(formatRequest(request));
        }
        console.log("______projectRequest: ", listFormated);
        cb(listFormated);
      })
      .catch((err) => {
        console.log(typeof err, err);
        return;
      });
  }
};
