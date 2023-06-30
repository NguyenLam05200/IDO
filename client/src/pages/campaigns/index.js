import ButtonCustom from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import {
    Card,
    CardActions,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

export const CampaignList = [
    { id: "012345678davaefefe", name: "Campaign 1" },
    { id: "djdahdddlahskshoii11hh3kl11j13l1", name: "Campaign 2" },
    { id: "dvvvhđhlahskshoii11hh3kl11j13l1", name: "Campaign 3" },
];
export default function Campaigns() {
    const projects = useSelector((state) => state.project.projects);
    const router = useRouter();

    return (
        <OnlyClient>
            <div className="flex items-end justify-between mb-8">
                <Typography variant="h5" className="font-semibold">
                    {/* Recent projects: {projects} */}
                </Typography>
                <ButtonCustom
                    onClick={() => router.push("./new-campaign")}
                    className="!w-auto px-8"
                >
                    Create new Campaign
                </ButtonCustom>
            </div>
            <Stack spacing={2}>
                {CampaignList.map((eachProject) => (
                    <Card
                        className="cursor-pointer flex justify-between hover:border-b-cyan-600 hover:bg-sky-700"
                        key={eachProject.id}
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                            >
                                {eachProject.name}
                            </Typography>
                            <Typography variant="body2" color="black">
                                {eachProject.id}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link
                                className="text-purple-1 font-semibold p-2"
                                size="medium"
                                href={{
                                    pathname: "/campaigns/[slug]",
                                    query: { slug: eachProject.id },
                                }}
                            >
                                View Detail
                            </Link>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </OnlyClient>
    );
}
