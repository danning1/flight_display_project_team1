import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";

export default function CallHome(){

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
            display:"flex",
            flexDirection:"row",
          }}>

          </Box>

        </Box>
        </React.Fragment>
    )
}