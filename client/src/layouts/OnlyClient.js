import ResponsiveAppBar from "@/components/AppBar";
import NextBreadcrumbs from "@/components/breadcrums";
import { CampaignList } from "@/pages/campaigns";
import { Box, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const OnlyClient = ({ children }) => {
    const [mount, setMount] = useState(false);

    const getDefaultTextGenerator = useCallback((subpath) => {
        console.log("______________" + subpath);
        return {
            [subpath]: subpath,
        }[subpath];
    }, []);

    const getTextGenerator = useCallback((param, query) => {
        return {
            slug: () =>
                CampaignList.find((campaign) => campaign.id === query.slug) //Chỉnh sửa cho phù hợp data
                    .name,
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
