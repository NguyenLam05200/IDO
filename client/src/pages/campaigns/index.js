import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OnlyClient from "@/layouts/OnlyClient";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import ButtonCustom from "@/components/Button/Button";
import Link from "next/link";

const CampaignList = [
  { id: "012345678davaefefe", name: "Campaign 1" },
  { id: "djdahdddlahskshoii11hh3kl11j13l1", name: "Campaign 2" },
  { id: "dvvvhđhlahskshoii11hh3kl11j13l1", name: "Campaign 3" },
];
export default function Campaigns() {
  const projects = useSelector((state) => state.project.projects);
  const router = useRouter();

  return (
    <OnlyClient>
      <div className="flex items-center justify-center t-title !text-[35px] font-semibold">
        Campaign List 📚
      </div>
      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-8">
          <Typography variant="h5" className="font-semibold">
            Recent projects: {projects}
          </Typography>
          <ButtonCustom
            onClick={() => router.push("./new-campaign")}
            className="!w-auto px-8"
          >
            Create new Campaign
          </ButtonCustom>
        </div>

        {CampaignList.map((eachProject) => (
          <Card className="mb-[20px] cursor-pointer">
            <CardContent className="pb-[0px]">
              <Typography gutterBottom variant="h6" component="div">
                {eachProject.name}
              </Typography>
              <Typography variant="body" color="black">
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
      </div>
    </OnlyClient>
  );
}
