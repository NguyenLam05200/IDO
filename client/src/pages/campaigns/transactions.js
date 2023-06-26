import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import OnlyClient from "@/layouts/OnlyClient";
import { useRouter } from "next/router";

const PRO = [{ id: 1, name: "Campain 1" }];
export default function Transaction() {
  const projects = useSelector((state) => state.project.projects);
  const router =  useRouter();

  return (
    <OnlyClient>
      <div className="pt-[200px] bg-black">
        Hello from Campaigns page: {projects}
        {PRO.map((eachProject) => (
          <div className="bg-[#50d71e]" key={eachProject.id}>
            <h1 className="text-3xl font-bold">{eachProject.name}</h1>
            <Button onClick={() => router.push('/campaigns/details')}>Hello world</Button>
          </div>
        ))}
      </div>
    </OnlyClient>
  );
}
