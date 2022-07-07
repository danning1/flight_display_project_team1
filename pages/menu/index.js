import React, { useEffect, useState } from "react";
import CardListWithType from "../../components/CardListWithType";
import { Box } from "@mui/material";
import NavBar from "../../components/NavBar";

export default function MenuHome(props){

    // nav bar variabel
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
    },[]);

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

          {/*Body*/}
          <Box sx={{
            flex:1,
            backgroundColor:"cyan",
            display:"flex",
            flexDirection:"row",
          }}>
            <CardListWithType data={props.menu} data_type={props.menuType} currentTab="menu"></CardListWithType>
          </Box>
        </Box>
    </React.Fragment>
    )
}

export async function getStaticProps(){
  const res0 = await fetch(`${process.env.HOST}/api/menu/read`)
  const res1 = await fetch(`${process.env.HOST}/api/menu/readType`)
  const menu = await res0.json()
  const menuType = await res1.json()
  return{
    props:{menu:menu,menuType:menuType},
  }
}