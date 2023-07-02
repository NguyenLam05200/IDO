import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { contribute, getProjectDetails } from "@/redux/projectSlice";
import {
  Alert,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { indigo, red } from "@mui/material/colors";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Web3 from "web3";

const project = {
  name: "This is Campaign Name ",
  ownerAddress: "ThisIsAHashString",
  FundraiseGoal: 3000000,
  minimumContribution: 100,
  numberOfRequests: 3,
  numberOfApprovers: 2,
  balance: 150,
  description: "Đây là một dự án đầu tư 1 lời 100, mại dô mại dô",
};

const DataRow = [
  {
    text: "Number of approvers",
    value: (project) => project?.contributorAddresses?.length ?? 0,
    tooltipText:
      "The number of people who have already donated to this campaign.",
  },
  {
    text: "Number of requests",
    value: (project) => project?.numberOfRequests,
    tooltipText:
      "A request with the purpose of trying to withdraw money from the contract. Requests must be approved by at least 50% approver first.",
  },
  {
    text: "Campaign balance (ether)",
    value: (project) => project?.totalContributedETH ?? 0,
    tooltipText: "AIt stands for how much money this campaign has accumulated.",
  },
];
const toUSD = (number) => {
  return number
    ? number.toLocaleString("en-US", {
        style: "currency",
        currency: "ETH",
      })
    : "";
};

const StatisticRow = ({ text, value, tooltipText }) => {
  return (
    <Tooltip title={tooltipText} placement="left" arrow>
      <Stack direction="row" spacing={1}>
        <div>{text}</div>
        <hr className="tabSpacer" />
        <div>{value}</div>
      </Stack>
    </Tooltip>
  );
};

export default function Details() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { slug } = router.query;

  const [project, setProject] = useState({});

  useEffect(() => {
    getProjectDetails({ projectId: slug }, (obj) => setProject(obj));
  }, [slug]);

  const [isError, setIsError] = useState("");

  const onSubmit = async (data) => {
    // console.log("__data: ", data.amountEther);
    const x = await contribute(slug, data.amountEther);
    if (x?.isError) setIsError(x.reason);
    else {
      getProjectDetails({ projectId: slug }, (obj) => setProject(obj));
    }
    // console.log("______x: ", x, data);
  };

  return (
    <OnlyClient>
      {/* <Snackbar
        open={isError}
        autoHideDuration={10000}
        onClose={() => setIsError("")}
      >
        <Alert severity="error">{isError}</Alert>
      </Snackbar> */}
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError("")}
        message={isError}
      />
      <Head>
        <title>{project.title}</title>
      </Head>

      <div className="flex items-end justify-between mb-12">
        <Typography
          variant="h3"
          variantMapping="h1"
          color={indigo[900]}
          gutterBottom
          className="!mb-0"
        >
          {project.title}
        </Typography>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          {/* <Typography variant="h6" className="font-bold">
            Amount to contribute (Ethereum)
          </Typography> */}
          <Stack direction="row" spacing={1}>
            {/* <input
              type="number"
              className="t-input"
              defaultValue=""
              step={0.0001}
              {...register("amountEther")}
            /> */}
            <TextField
              size="small"
              inputProps={{
                maxLength: 13,
                step: "0.000001",
              }}
              className="!w-[300px]"
              id="amountEther"
              label="Amount in ETH"
              variant="outlined"
              type="number"
              {...register("amountEther")}
            />

            <Button
              className="max-w-xs !h-auto !py-[2px] !px-[30px] !w-auto"
              type="submit"
            >
              Contribute ➕➕➕
            </Button>
          </Stack>
        </form>
      </div>

      <div className="!w-full mb-12 grid grid-cols-1 md:grid-cols-5 gap-8 grid-rows-1">
        <div className="flex flex-col gap-8 !w-full col-span-2">
          {/* Address of Manager */}
          <Typography variant="h6" color={indigo[800]}>
            Address of Manager
          </Typography>
          <Tooltip
            arrow
            title="The manager who created this campaign can create a
                        requests to withdraw funds."
          >
            {project.createdBy}
          </Tooltip>
          {/* Campaign's name */}
          <Typography variant="h6" color={indigo[800]}>
            Description
          </Typography>
          <Typography variant="body" gutterBottom>
            {project.description}
          </Typography>

          {/* Minimum contribution (wei) */}
          <Typography variant="h6" color={indigo[800]}>
            Minimum Contribution:{" "}
            <span className="font-bold">{project.minContribute} (ETH)</span>
          </Typography>
          <Typography variant="body">
            You must contribute at lease this wei to become a approver.
          </Typography>
        </div>

        <div className="flex flex-col !w-full md:mt-0 mt-8 col-span-3 h-full">
          <Card
            sx={{ minWidth: 300 }}
            className="!w-full h-full shadow-sm flex flex-col justify-between p-8"
          >
            <Typography variant="h5">Fundraise Goal</Typography>
            <Typography variant="h2" color={red[900]} gutterBottom>
              {toUSD(project.raiseTarget)}
            </Typography>
            {DataRow.map((row) => (
              <StatisticRow
                text={row.text}
                value={row.value(project)}
                tooltipText={row.tooltipText}
                key={row.text}
              />
            ))}
            <Button
              className="w-full p-[10px] mt-6"
              onClick={() =>
                router.push({
                  pathname: "/campaigns/[slug]/requests",
                  query: { slug: slug },
                })
              }
            >
              Request 🧾
            </Button>
          </Card>
        </div>
      </div>
    </OnlyClient>
  );
}
