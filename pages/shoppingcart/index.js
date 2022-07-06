import React, { useEffect, useState } from "react";
import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, IconButton, Button } from "@mui/material";
import Paper from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { useRouter } from "next/router";

export default function CartHome(props){
    const [changeCount,setChangeCount] = useState(0);
    const [shoppingCart,setShoppingCart] = useState(null);
    const [onload,setOnload] = useState(false);
    const router = useRouter()

    useEffect(()=>{
      let data = localStorage.getItem('shoppingCartDB');
      if(!data) 
      data = {}
      else
      data = JSON.parse(data)
      setShoppingCart(data)
      setOnload(true);
    },[])

    function onClickHandeler(name,f){
      let data = shoppingCart
      console.log(name,f)
      if (f==1){
        console.log(data)
        data[name].count += 1;
        console.log(data)
      }else{
        if(data[name].count<=1){
          delete data[name];
        }else{
          data[name].count -= 1;
        }
      }

      setShoppingCart(data)
      setChangeCount(changeCount+1)
    }

    useEffect(
      ()=>{
        if(onload){
          const jsonObject = JSON.stringify(shoppingCart);
          localStorage.setItem('shoppingCartDB',jsonObject);
        }
      },[changeCount]
    )

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
            backgroundColor:"white",
            display:"flex",
            flexDirection:'column',
          }}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Count</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(!shoppingCart)?<React.Fragment></React.Fragment>:Object.keys(shoppingCart).map((name)=>
                            <TableRow key={shoppingCart[name].name}>
                                <TableCell>{shoppingCart[name].name}</TableCell>
                                <TableCell>{shoppingCart[name].price}$</TableCell>
                                <TableCell>
                                <IconButton onClick={e=>{onClickHandeler(name,0)}}><ArrowLeftIcon></ArrowLeftIcon></IconButton>
                                {shoppingCart[name].count}
                                <IconButton onClick={e=>{onClickHandeler(name,1)}}><ArrowRightIcon></ArrowRightIcon></IconButton>
                                </TableCell>
                                <TableCell>{(shoppingCart[name].price*shoppingCart[name].count).toFixed(2)}$</TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
              <Button variant='contained' sx={{backgroundColor:'green'}}>Pay</Button>
          </Box>
        </Box>
    </React.Fragment>
    )
}

export async function getStaticProps(){
  const res = await fetch(`${process.env.HOST}/api/shoppingCart/read`)
  const cart = await res.json();
  return{
    props:{cart:cart},
  }
}