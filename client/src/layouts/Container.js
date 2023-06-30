import React, { useEffect, useState } from "react";
import Web3 from "web3";

import ProjectIDO from "../contracts/ProjectIDO.json";
import { useDispatch } from "react-redux";
import { initializeState } from "@/redux/projectSlice";

const Container = ({ children }) => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [contract, setContract] = useState({});

  useEffect(() => {
    const initProvider = async () => {
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

            setContract(contract);

            const projectIds = await contract.methods.getProjectIds().call();
            const projects = [];
            for (let i = 0; i < projectIds.length; i++) {
              const projectId = projectIds[i];
              const projectDetails = await contract.methods
                .getProjectDetails(projectId)
                .call();

              const formattedProject = {
                projectId: Number(projectId),
                createdBy: projectDetails[0],
                title: projectDetails[1],
                description: projectDetails[2],
                minContribute: Number(projectDetails[3]),
                raiseTarget: Number(projectDetails[4]),
                contributorAddresses: projectDetails[5],
                totalContributedETH: Number(projectDetails[6]),
                tokenAddress: projectDetails[7],
              };

              projects.push(formattedProject);
            }

            dispatch(initializeState({ projects: projects }));
          })
          .catch((err) => {
            console.log(err);
            return;
          });

        window.ethereum.on("accountsChanged", function (accounts) {
          selectedAccount = accounts[0];
          console.log(`Selected account changed to ${selectedAccount}`);
        });
      }
      setIsInitialized(true);
    };
    initProvider();
  }, []);

  return (
    <div className="container">
      {children && React.cloneElement(children, { contract })}
    </div>
  );
};

export default Container;
