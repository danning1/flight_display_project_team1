import { Card, Box, Typography, CardActionArea } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function CardListWithType({data,data_type}){
    const data_map = Object.keys(data).map(type=>
            <React.Fragment key={type}>
                <Typography variant="h4" sx={{width:'100%',height:'50px'}}>{data_type[type].name}:</Typography>
                {data[type].map(
                    el=>
                            <React.Fragment key={el.name}>
                                <Card  sx={{flex:1/4,margin:"10px",height:'200px',minWidth:"300px"}}>
                                <CardActionArea >
                                    <Typography  variant="h4" >{el.name}</Typography>
                                </CardActionArea>
                                </Card>
                            </React.Fragment>
                )}
            </React.Fragment>
        )
    return(
        <Box sx={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
                {data_map}
        </Box>
    )
}



