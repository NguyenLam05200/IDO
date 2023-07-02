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
import Image from "next/image";
import Button from "@/components/Button/Button";

export const CampaignList = [
  { id: "012345678davaefefe", name: "Campaign 1" },
  { id: "djdahdddlahskshoii11hh3kl11j13l1", name: "Campaign 2" },
  { id: "dvvvhđhlahskshoii11hh3kl11j13l1", name: "Campaign 3" },
];
export default function Campaigns() {
  const projects = useSelector((state) => state.project.projects);
  //   const projects = [
  //     {
  //       projectId: Number(projectId),
  //       createdBy: projectDetails[0],
  //       title: projectDetails[1],
  //       description: projectDetails[2],
  //       minContribute: Number(projectDetails[3]),
  //       raiseTarget: Number(projectDetails[4]),
  //       contributorAddresses: projectDetails[5],
  //       totalContributedETH: Number(projectDetails[6]),
  //       tokenAddress: projectDetails[7],
  //       tokenName: projectDetails[8],
  //       tokenSymbol: projectDetails[9],
  //       tokenImage: "",
  //     },
  //   ];
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
          {projects.map((eachProject) => {
            return (
              <div
                key={eachProject.projectId}
                className="bg-gray-13 dark:bg-dark shadow-dropdown dark:hover:bg-hover-dark rounded-xl py-6 px-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <Image
                    src={eachProject.tokenImage}
                    width={68}
                    height={68}
                    alt={eachProject?.tokenImage}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{eachProject?.title}</div>
                    <div className="mt-2 flex items-center gap-x-3">
                      <span className="txtSecond-2">
                        {eachProject?.createdBy}
                      </span>
                      {/* {eachProject?. && (
                      <TagV2 type="success" icon={false}>
                        <span className="text-xs font-normal whitespace-nowrap">
                          {t("reference:referral.default")}
                        </span>
                      </TagV2>
                    )} */}
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    variants="text"
                    className="px-6 !text-base"
                    onClick={() =>
                      router.push({
                        pathname: "/campaigns/[slug]",
                        query: { slug: eachProject.projectId },
                      })
                    }
                  >
                    View details
                  </Button>
                </div>
              </div>
            );
          })}
          {/* {projects.map((eachProject) => (
          <Card
            className="cursor-pointer flex justify-between hover:border-b-cyan-600 hover:bg-sky-700"
            key={eachProject.projectId}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {eachProject.title}
              </Typography>
              <Typography variant="body2" color="black">
                {eachProject.description}
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
        ))} */}
        </Stack>

    </OnlyClient>
  );
}
