import React from "react";
import CardListWithType from "../components/CardListWithType";
import { Box } from "@mui/material";

export default function MovieHome(props){
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

          {/*Body*/}
          <Box sx={{
            flex:1,
            backgroundColor:"cyan",
            display:"flex",
            flexDirection:"row",
          }}>
            <CardListWithType data={props.movie} data_type={props.movieType}></CardListWithType>
          </Box>
        </Box>
    </React.Fragment>
    )
}

export async function getStaticProps(){
  const res0 = await fetch(`${process.env.HOST}/api/movie/read`)
  const res1 = await fetch(`${process.env.HOST}/api/movie/readType`)
  const movie = await res0.json()
  const movieType = await res1.json()
  return{
    props:{movie:movie,movieType:movieType},
  }
}