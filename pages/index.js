import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import NavBar from "../components/NavBar";

export default function Home(props){
  const [user,setUser] = useState(null);
  const [isLogin,setIsLogin] = useState(false);

  useEffect(()=>{
    let data = localStorage.getItem('userDB');

    if(!data) {
        setIsLogin(false)
    }
    else{
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

export async function getStaticProps(context){
  const res = await fetch(`${process.env.HOST}/api/categories/read`)
  const categories = await res.json()
  return{
    props:{categories:categories},
  }
}