import React, { useEffect, useState } from "react";
const { Web3 } = require("web3");
import SimpleStorage from "../contracts/SimpleStorage.json";

const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
const abi = SimpleStorage.abi;
const ganacheUrl = "http://localhost:7545";
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

export default function index() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState(null);

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider(ganacheUrl);
    if (!provider) console.log("Please start Ganache");

    async function template() {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];

      // Contract instance
      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );

      console.log("______contract: ", contract._methods);
      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);

  useEffect(() => {
    const { contract } = state;
    async function readData() {
      const count = await contract.methods.retrieve().call();

      setData(Number(count));
    }
    contract && readData();
  }, [state.contract]);

  async function writeData() {
    const { contract } = state;
    await contract._methods
      .store(10)
      .send({ from: "0x1e3bA043F62cAb9629bac16E99A6437d9aCE4e9D" });
    window.location.reload();
  }

  return (
    <div>
      <div>Hello from Campaigns page: {data}</div>
      <button onClick={writeData}>Change data</button>
    </div>
  );
}
