import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OnlyClient from "@/layouts/OnlyClient";
import { useRouter } from "next/router";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import ButtonCustom from "@/components/Button/Button";

const CampaignList = [{ id: '012345678davaefefe', name: "Campaign 1" }, { id: 'djdahdddlahskshoii11hh3kl11j13l1', name: "Campaign 2" }, { id: 'dvvvhđhlahskshoii11hh3kl11j13l1', name: "Campaign 3" }];
export default function Campaigns() {
  const projects = useSelector((state) => state.project.projects);
  const router = useRouter();

  return (
    <OnlyClient>
    <Typography variant="h4" className="t-title">Campaign List 📚</Typography>
      <div className="t-campaigns p-[20px]">
        <div className="t-campaigns-list">
          <Typography variant="h5">
            Hello from Campaigns page: {projects}
          </Typography>
          {CampaignList.map((eachProject) => (
            <Card sx={{ maxWidth: 900 }} className="mb-[20px]">
              <CardContent className="pb-[0px]">
                <Typography gutterBottom variant="h6" component="div">
                  {eachProject.name}
                </Typography>
                <Typography variant="body" color="black">
                  {eachProject.id}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" href="./campaigns/slug">View Detail</Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <div className="p-[20px]">
          <ButtonCustom onClick={ () => router.push('./new-campaign')} className="max-w-fit p-[10px]">Create a Campaign</ButtonCustom>
        </div>
      </div>
    </OnlyClient>
  );
}
