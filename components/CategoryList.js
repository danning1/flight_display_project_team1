import { Card, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function ItemList({categories}){

    return(
        <Box sx={{display:"flex",flexDirection:"row",width:"100%"}}>
                {categories.map(el=>
                    <Card key={el.name} sx={{flex:1/4,margin:"10px"}}>
                        <Typography variant="h2">{el.name}</Typography>
                    </Card>
                )}
        </Box>
    )
}