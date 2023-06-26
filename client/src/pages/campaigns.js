import React, { useEffect, useState } from "react";
const { Web3 } = require("web3");
import SimpleStorage from "../contracts/SimpleStorage.json";
import { useSelector } from "react-redux";
import OnlyClient from "../layouts/OnlyClient";
import Button from "@/components/Button/Button";
const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
const abi = SimpleStorage.abi;
const ganacheUrl = "http://localhost:7545";
const httpProvider = new Web3.providers.HttpProvider(ganacheUrl);
const web3 = new Web3(httpProvider);

const PRO = [{ id: 1, name: "Campain 1" }];
export default function Campaigns() {
  const projects = useSelector((state) => state.project.projects);

  return (
    <OnlyClient>
      <div className="pt-[200px] bg-black">
        Hello from Campaigns page: {projects}
        {PRO.map((eachProject) => (
          <div className="bg-[#50d71e]" key={eachProject.id}>
            <h1 className="text-3xl font-bold">{eachProject.name}</h1>
            <Button disabled={true} onClick={() => {console.log("HIHIHI")}}>Hello world</Button>
          </div>
        ))}
      </div>
    </OnlyClient>
  );
}
