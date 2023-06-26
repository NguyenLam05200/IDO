import React, { useEffect, useState } from "react";
const { Web3 } = require("web3");
import SimpleStorage from "../contracts/SimpleStorage.json";
import { useSelector } from "react-redux";
import OnlyClient from '../layouts/OnlyClient'
const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
const abi = SimpleStorage.abi;
const ganacheUrl = "http://localhost:7545";
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

export default function Campaigns() { 
  const projects = useSelector((state) => state.project.projects); 

  return (
    <OnlyClient>
      <div>Hello from Campaigns page: {projects} </div>
    </OnlyClient>
  );
}
