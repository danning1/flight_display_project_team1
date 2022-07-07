import { Card, Box, Typography, CardActionArea, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default function ItemList({categories}){
    const router = useRouter()

    function stringToColor(string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
      }
    return(
        <Box sx={{display:"flex",flexDirection:"row",width:"100%"}}>
                {categories.map(el=>
                <React.Fragment key={el.name}>
                    <Card sx={{flex:1/4,margin:"10px",height:'100px',width:'300px',backgroundColor:'#B4E1F9'}} onClick={e=>{router.push(`/${el.name.toLowerCase()}`)}}>
                        <CardActionArea sx={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
                            <Avatar sx={{bgcolor: stringToColor(el.name),height:'70px',width:'70px'}} children={`${el.name}`} ></Avatar>
                            {/* <Typography align='center' alignself='center' variant="h6" sx={{height:'60px',width:'100%',flex:1/5}}>{el.name}</Typography>
                            <Box sx={{width:'100%',flex:4/5,backgroundColor:'rgb(231, 238, 244)'}}></Box> */}
                        </CardActionArea>
                    </Card>
                </React.Fragment>
                )}
        </Box>
    )
}