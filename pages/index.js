import { PictureAsPdfRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import ItemList from "../components/ItemList";

export default function Home(){
  return(
    <React.Fragment>
        <Box sx={{
          width:"100%",
          display:"flex",
          minHeight:"100%",
          flexDirection:"column",
        }}>
          {/* navbar */}
          <Box sx={{
            height:"50px",
            backgroundColor:"gray",
          }}>

          </Box>
          {/*head*/}
          <Box sx={{
            flex:0.4,
            backgroundColor:"red",
          }}>
            <img src="/flight001.jpg"></img>
          </Box>
          {/*Body*/}
          <Box sx={{
            flex:0.6,
            backgroundColor:"blue",
            display:"flex",
            flexDirection:"row",
          }}>
            <ItemList></ItemList>
          </Box>
        </Box>
    </React.Fragment>
  )
}