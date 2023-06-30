import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { Typography } from "@mui/material";
import { Router } from "next/router";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Web3 from "web3";
import ProjectIDO from "../contracts/ProjectIDO.json";

const createProject = async ({
  title,
  description,
  minContribute,
  raiseTarget,
  tokenName,
  tokenSymbol,
  tokenInitialSupply,
}) => {
  if (
    !title ||
    !description ||
    !minContribute ||
    !raiseTarget ||
    !tokenName ||
    !tokenSymbol ||
    !tokenInitialSupply
  )
    return "Missing input fields";

  try {
    let provider = window.ethereum;
    const web3 = new Web3(provider);

    if (typeof provider !== "undefined") {
      await provider.request({
        method: "eth_requestAccounts",
      });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      // console.log(`Selected account is ${selectedAccount}`);
      console.log(`Selecteda we awrg account is ${account}`);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ProjectIDO.networks[networkId];

      // Contract instance
      const contract = new web3.eth.Contract(
        ProjectIDO.abi,
        deployedNetwork.address
      );

      const createdProject = await contract.methods
        .createProject(
          title,
          description,
          minContribute,
          raiseTarget,
          tokenName,
          tokenSymbol,
          tokenInitialSupply
        )

        .send({ from: account }, function (err, res) {
          if (err) {
            console.log("An error occurred", err);
            return;
          }
          console.log("Hash of the transaction: " + res);
        });

      window.ethereum.on("accountsChanged", function (accounts) {
        selectedAccount = accounts[0];
        console.log(`Selected account changed to ${selectedAccount}`);
      });
    }
  } catch (e) {
    console.log("____e: ", e);
    if (e.code === 100) {
      //user rejected the transaction
      console.log("user rejected the transaction");
    }
  }
};

const ListInput = [
  {
    label: "Project title",
    name: "title",
    type: "text",
  },
  {
    label: "Project description",
    name: "description",
    type: "text",
  },
  {
    label: "Raise target",
    name: "raiseTarget",
    type: "number",
  },
  {
    label: "Minimum contribute",
    name: "minContribute",
    type: "number",
  },
  {
    label: "Token name",
    name: "tokenName",
    type: "text",
  },
  {
    label: "Token symbol",
    name: "tokenSymbol",
    type: "text",
  },
  {
    label: "Initial supply of token",
    name: "tokenInitialSupply",
    type: "number",
  },
];

export default function NewCampaign({}) {
  const web3 = new Web3();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log("_____data: ", data);

    const rs = await createProject({
      title: "Education in web3",
      description:
        "Building an system educate for all student in the world, real, public and sharing.",
      minContribute: web3.utils.toWei(0.01, "wei"),
      raiseTarget: 10,
      tokenName: "Edu3",
      tokenSymbol: "Education web3",
      tokenInitialSupply: 10000,
    });
    reset();
  };

  useEffect(() => {
    // createProject();
  }, []);

  return (
    <OnlyClient>
      <Typography variant="h3">Create new campaign</Typography>
      <div className="flex justify-center items-center mt-[80px]">
        <form
          className="min-w-[600px] grid grid-cols-2 gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {ListInput.map((item) => (
            <div key={item.name}>
              <Typography variant="h6" className="font-bold">
                {item.label}
              </Typography>
              <input
                type={item.type}
                className="t-input"
                defaultValue=""
                {...register(item.name)}
              />
            </div>
          ))} 
          <Button className="p-[10px] mt-[20px] !w-full" type="submit">
            Create ⏩
          </Button>
        </form>
      </div>
    </OnlyClient>
  );
}
