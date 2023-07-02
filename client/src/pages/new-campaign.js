import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { Typography } from "@mui/material";
import { Router, useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import ProjectIDO from "../contracts/ProjectIDO.json";
import { isObject } from "lodash";
import { addProject } from "@/redux/projectSlice";

const createProject = async ({
  title,
  description,
  minContribute,
  raiseTarget,
  tokenName,
  tokenSymbol,
  tokenInitialSupply,
  tokenImage,
}) => {
  if (
    !title ||
    !description ||
    !minContribute ||
    !raiseTarget ||
    !tokenName ||
    !tokenSymbol ||
    !tokenInitialSupply ||
    !tokenImage
  )
    return "Missing input fields";

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

      const createdProject = await contract.methods
        .createProject(
          title,
          description,
          minContribute,
          raiseTarget,
          tokenName,
          tokenSymbol,
          tokenInitialSupply,
          tokenImage
        )
        .send({ from: account });

      return createdProject;
      // window.ethereum.on("accountsChanged", function (accounts) {
      //   selectedAccount = accounts[0];
      //   console.log(`Selected account changed to ${selectedAccount}`);
      // });
    }
  } catch (e) {
    console.log("____e: ", e);
    if (e.code === 100) {
      //user rejected the transaction
      console.log("user rejected the transaction");
    }
  }
  // web3.eth.net
  //   .isListening()
  //   .then(async () => {

  //   })
  //   .catch((e) => console.log("Wow. Something went wrong: " + e));
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
  {
    label: "Token Image URL",
    name: "tokenImage",
    type: "text",
  },
];

export default function NewCampaign({}) {
  const { register, handleSubmit, reset } = useForm();
  const projects = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("_____data: ", data);
    const {
      description,
      minContribute,
      raiseTarget,
      title,
      tokenInitialSupply,
      tokenName,
      tokenSymbol,
      tokenImage
    } = data;

    const createdProject = await createProject({
      title,
      description,
      minContribute: Web3.utils.toWei(minContribute, "ether"),
      raiseTarget: Web3.utils.toWei(raiseTarget, "ether"),
      tokenName,
      tokenSymbol,
      tokenInitialSupply,
      tokenImage
    });

    // console.log("_______-createdProject: ", createdProject, isObject(createdProject), typeof createdProject);

    if (isObject(createdProject)) {
      router.push(`/campaigns/${projects.length + 1}`);
      // dispatch(addProject(data));
    }

    // const projectId =
    //     createdProject.events.ProjectCreated.returnValues.projectId;
    //   console.log("Project ID: ", projectId);

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
          className="max-w-[800px] grid grid-cols-2 gap-8 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {ListInput.map((item) => (
            <div key={item.name}>
              <Typography variant="h6" className="font-bold">
                {item.label}
              </Typography>
              <input
              step={0.00001}
                type={item.type}
                className="t-input !mb-0"
                defaultValue=""
                {...register(item.name)}
              />
            </div>
          ))}
          <Button className="p-[10px] mt-auto !w-full" type="submit">
            Create ⏩
          </Button>
        </form>
      </div>
    </OnlyClient>
  );
}
