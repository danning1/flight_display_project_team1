import React, { useEffect, useState } from "react";
import CardListWithType from "../../components/CardListWithType";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";

export default function MovieHome(props){
  const router = useRouter()
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
            <CardListWithType data={props.movie} data_type={props.movieType} currentTab="movie"></CardListWithType>
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