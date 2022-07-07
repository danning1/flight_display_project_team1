import React, { useEffect, useState } from "react";
import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, IconButton, Button } from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";

export default function CartHome(props){
    const router = useRouter()
    const [changeCount,setChangeCount] = useState(0);
    const [shoppingCart,setShoppingCart] = useState(null);
    const [onload,setOnload] = useState(false);
    const [totalPrice,setTotalPrice] = useState(0); 
    

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

    useEffect(()=>{
      let data = localStorage.getItem('shoppingCartDB');
      if(!data) 
      data = {}
      else
      data = JSON.parse(data)
      let t_price = 0.0;
      Object.keys(data).map((name)=>{
        t_price+=data[name].price*data[name].count;
      })
      setTotalPrice(t_price)
      setShoppingCart(data)
      setOnload(true);
    },[])

    function onClickHandeler(name,f){
      let data = shoppingCart
      console.log(name,f)
      if (f==1){
        console.log(data)
        data[name].count += 1;
      }else if(f==0){
        if(data[name].count<=1){
          delete data[name];
        }else{
          data[name].count -= 1;
        }
      }
      let t_price = 0.0;
      Object.keys(data).map((name)=>{
        t_price+=data[name].price*data[name].count;
      })
      setTotalPrice(t_price)
      setShoppingCart(data)
      setChangeCount(changeCount+1)
    }

    async function paymentHandeler(f){
      if(f==0){
        let data = localStorage.getItem('userDB');
        if(!data) {
          alert("plz log in first");
          data = {}
        }else{
          data = JSON.parse(data)
          const res = await fetch(`api/user/${data.id}/${totalPrice}`)
          if(res.status==200){
            const res_hist = await fetch(`api/shoppingHistory/create`,{
              method : "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({data:shoppingCart,userId:user.id})
            })
            .then(localStorage.removeItem('shoppingCartDB'))
            .then(router.reload(window.location.pathname))
            
          }else{
            alert(res.statusText)
          }
        }
      }else if (f==1){
        if (!user.id){
          alert("plz log in first");
        }else{
          const ct = await fetch(`api/shoppingHistory/create`,{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({data:shoppingCart,userId:user.id})
          })
          .then(localStorage.removeItem('shoppingCartDB'))
          .then(router.reload(window.location.pathname))
        }
        
        // router.push(`/creditCard`)
      }
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
          <NavBar user={user} isLogin={isLogin}></NavBar>

          {/*Body*/}
          <Box sx={{
            flex:1,
            backgroundColor:"white",
            display:"flex",
            flexDirection:'row',
            flexWrap:'wrap'
          }}>
            <TableContainer sx={{flex:'auto'}}>
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
              <Button onClick={e=>{paymentHandeler(1)}} variant='contained' sx={{backgroundColor:'green',flex:1/2,margin:'2px',height:'50px'}}>Pay with Credit Card ({totalPrice.toFixed(2)}$)</Button>
              <Button onClick={e=>{paymentHandeler(0)}} variant='contained' sx={{backgroundColor:'green',flex:1/2,margin:'2px',height:'50px'}}>Pay with Point ({totalPrice.toFixed(2)}$)</Button>
          </Box>
        </Box>
    </React.Fragment>
    )
}

export async function getServerSideProps(){
  const res = await fetch(`${process.env.HOST}/api/shoppingCart/read`)
  const cart = await res.json();
  return{
    props:{cart:cart},
  }
}