import { Card, Box, Typography, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default function ItemList({categories}){
    const router = useRouter()

    return(
        <Box sx={{display:"flex",flexDirection:"row",width:"100%"}}>
                {categories.map(el=>
                <React.Fragment key={el.name}>
                    <Card sx={{flex:1/4,margin:"10px"}} onClick={e=>{router.push(`/${el.name.toLowerCase()}`)}}>
                        <CardActionArea sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
                            <Typography align='center' alignself='center' variant="h6" sx={{height:'60px',width:'100%',flex:1/5}}>{el.name}</Typography>
                            <Box sx={{width:'100%',flex:4/5,backgroundColor:'red'}}>as</Box>
                        </CardActionArea>
                    </Card>
                </React.Fragment>
                )}
        </Box>
    )
}