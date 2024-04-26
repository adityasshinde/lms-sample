import { Avatar, Card, CardContent, CardMedia, Typography, useMediaQuery } from "@mui/material";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandTwitter,
} from "@tabler/icons";
import React from "react";
import GradientLink from "../form/GradientLink";
import { Box } from "@mui/system";

const InstructorCard = ({ name, deg, image, maxWidth, margin }) => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    return (
        <Card
            sx={{
                maxWidth: maxWidth,
                padding: "0px",
                margin: margin,
                position: "relative",
                overflow: "visible",
                paddingBottom: 0,
            }}
        >
            <CardContent sx={{  zIndex: 2, display: 'flex', alignContent: 'center', gap: '1rem', justifyContent: 'space-between' }}>
                <Box display='flex' gap={1}>
                    <Avatar src={image} sx={{ width: '60px', height: '60px' }} />
                    <Box minWidth={lgUp?'150px':'120px'} my='auto'>
                        <Typography
                            sx={{
                                textAlign: "left",
                                fontWeight: "bold",
                                color: "#4B4B4D",
                                
                            }}
                        >
                            {name}
                           
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "left",
                                marginTop: "4px",
                                fontWeight: "bold",
                                color: "#4B4B4DB2",
                            }}
                        >
                            {deg || "B.Tech"}
                        </Typography>
                    </Box>
                </Box>
                <GradientLink text='View Details' />
            </CardContent>
        </Card>
    );
};

export default InstructorCard;
