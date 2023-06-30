import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import {
    Card,
    CardContent,
    Divider,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { indigo, red } from "@mui/material/colors";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const CampaignData = {
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
        value: CampaignData.numberOfApprovers,
        tooltipText:
            "The number of people who have already donated to this campaign.",
    },
    {
        text: "Number of requests",
        value: CampaignData.numberOfRequests,
        tooltipText:
            "A request with the purpose of trying to withdraw money from the contract. Requests must be approved by at least 50% approver first.",
    },
    {
        text: "Campaign balance (ether)",
        value: CampaignData.balance,
        tooltipText:
            "AIt stands for how much money this campaign has accumulated.",
    },
];
const toUSD = (number) => {
    return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
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
    const onSubmit = (data) => console.log(data);
    const router = useRouter();
    const { slug } = router.query;
    console.log("_______", slug);
    return (
        <OnlyClient>
            <Head>
                <title>{CampaignData.name}</title>
            </Head>
            <Typography
                variant="h3"
                variantMapping="h1"
                color={indigo[900]}
                gutterBottom
            >
                {CampaignData.name}
            </Typography>
            <div className="grid md:grid-cols-3 grid-cols-1">
                <Stack spacing={2} className="md:col-span-2 col-span-1">
                    {/* Address of Manager */}

                    <Typography variant="h6" color={indigo[800]}>
                        Address of Manager
                    </Typography>
                    <Tooltip
                        arrow
                        title="The manager who created this campaign can create a
                        requests to withdraw funds."
                    >
                        {CampaignData.ownerAddress}
                    </Tooltip>
                    {/* Campaign's name */}
                    <Typography variant="h6" color={indigo[800]}>
                        Description
                    </Typography>
                    <Typography variant="body" gutterBottom>
                        {CampaignData.description}
                    </Typography>

                    {/* Minimum contribution (wei) */}
                    <Typography variant="h6" color={indigo[800]}>
                        Minimum Contribution (wei) :{" "}
                        <span className="font-bold">
                            {CampaignData.minimumContribution}
                        </span>
                    </Typography>
                    <Typography variant="body">
                        You must contribute at lease this wei to become a
                        approver.
                    </Typography>
                    <Divider sx={{ my: 2 }} variant="middle" />
                </Stack>
                <Stack spacing={2} className="">
                    <Card sx={{ minWidth: 300 }}>
                        <CardContent>
                            <Typography variant="caption">
                                Fundraise Goal
                            </Typography>
                            <Typography
                                variant="h2"
                                color={red[900]}
                                gutterBottom
                            >
                                {toUSD(CampaignData.FundraiseGoal)}
                            </Typography>
                            {DataRow.map((row) => (
                                <StatisticRow
                                    text={row.text}
                                    value={row.value}
                                    tooltipText={row.tooltipText}
                                    key={row.text}
                                />
                            ))}
                            <Button
                                className="max-w-xs p-[10px] m-[20px]"
                                onClick={() =>
                                    router.push({
                                        pathname: "/campaigns/[slug]/requests",
                                        query: { slug: slug },
                                    })
                                }
                            >
                                Request 🧾
                            </Button>
                        </CardContent>
                    </Card>
                    <Stack spacing={1}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography variant="h6" className="font-bold">
                                Amount to contribute (Ethereum)
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <input
                                    type="number"
                                    className="t-input"
                                    defaultValue=""
                                    {...register("amountEther")}
                                />

                                <Button
                                    className="max-w-xs p-[10px]"
                                    type="submit"
                                >
                                    Contribute ➕➕➕
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Stack>
            </div>
        </OnlyClient>
    );
}
