import ResponsiveAppBar from "@/components/AppBar";
import NextBreadcrumbs from "@/components/breadcrums";
import { CampaignList } from "@/pages/campaigns";
import { Box, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OnlyClient = ({ children }) => {
  const [mount, setMount] = useState(false);
  const projects = useSelector((state) => state.project.projects);

  const getDefaultTextGenerator = useCallback((subpath) => {
    return {
      [subpath]: subpath,
    }[subpath];
  }, []);

  const getTextGenerator = useCallback((param, query) => {
    return {
      slug: () =>
        {
          const x = projects.find((obj) => {
            return obj.projectId + '' === query.slug
          })

          console.log(x);

          return x?.title ?? query.slug
        }, // Chỉnh sửa cho phù hợp data
    }[param];
  }, []);

  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Box sx={{ my: 3 }}>
          <NextBreadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
        </Box>
        {children}
      </Container>
    </>
  );
};

export default OnlyClient;
