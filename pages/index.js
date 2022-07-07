import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import NavBar from "../components/NavBar";

export default function Home(props){
  const [user,setUser] = useState(null);
  const [isLogin,setIsLogin] = useState(false);

  useEffect(()=>{
    let data = localStorage.getItem('userDB');

    if(!data||data=='null') {
        setIsLogin(false)
    }else{
      data = JSON.parse(data);
      fetch(`/api/user/${data.id}`)
      .then(res=>res.json())
      .then((d)=>{
        setUser(d);
        localStorage.setItem('userDB',JSON.stringify(d))
        setIsLogin(true);
      })
    }
  },[])
  
  return(
    <React.Fragment>
        <Box sx={{
          width:"100%",
          display:"flex",
          minHeight:"100%",
          flexDirection:"column",
        }}>
          {/* navbar */}
          <NavBar user={user} isLogin={isLogin}></NavBar>

          {/*head*/}
          <Box sx={{
            flex:0.4,
            backgroundImage:`url(/flight001.jpg)`,
            backgroundRepeat:'no-repeat',
            backgroundSize:'100% 100%',
            display:"inline-flex",
          }}>
            <Box sx={{
              margin:'10%',
              flex:1,
              backgroundColor:'white',
            }}>
              <Typography align='center' variant='h2'>Welcome to xxx AirLine</Typography>
              <Typography align='center' variant='h4'>Flight Model: 737 Max</Typography>
              <Typography align='center' variant='h4'>From: somewhere</Typography>
              <Typography align='center' variant='h4'>To: nowhere</Typography>
              <Typography align='center' variant='h4'>Estimate Time: 7/8/2023 6:00 AM EST</Typography>
            </Box>
          </Box>
          {/*Body*/}
          <Box sx={{
            flex:0.6,
            borderTop:1,
            borderLeft:0,
            borderRight:0,
            borderBottom:0,
            borderStyle:'solid',
            display:"flex",
            flexDirection:"row",
          }}>
            <CategoryList categories={props.categories}></CategoryList>
          </Box>
        </Box>
    </React.Fragment>
  )
}

export async function getStaticProps(context){
  const res = await fetch(`${process.env.HOST}/api/categories/read`)
  const categories = await res.json()
  return{
    props:{categories:categories},
  }
}