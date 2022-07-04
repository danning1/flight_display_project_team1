import { Box } from "@mui/material";
import React from "react";
import CategoryList from "../components/CategoryList";

export default function Home(props){
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
            height:"60px",
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
            <CategoryList categories={props.categories}></CategoryList>
          </Box>
        </Box>
    </React.Fragment>
  )
}

export async function getStaticProps(){
  const res = await fetch(`${process.env.HOST}/api/categories/read`)
  const categories = await res.json()
  return{
    props:{categories:categories},
  }
}