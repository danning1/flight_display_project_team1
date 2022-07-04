import { Card, Box, Typography, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function ItemList({categories}){
    const router = useRouter()
    return(
        <Box sx={{display:"flex",flexDirection:"row",width:"100%"}}>
                {categories.map(el=>
                <React.Fragment key={el.name}>
                    <Card sx={{flex:1/4,margin:"10px"}} onClick={e=>{router.push(`/${el.name.toLowerCase()}`)}}>
                        <CardActionArea>
                            <Typography variant="h2">{el.name}</Typography>
                        </CardActionArea>
                    </Card>
                </React.Fragment>
                )}
        </Box>
    )
}