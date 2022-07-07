import { Button, Dialog, DialogTitle, IconButton, TextField, Typography, Box, Badge, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuIcon from '@mui/icons-material/Menu';
import { Label } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home'

export default function NavBar({user, isLogin}){
    const router = useRouter();
    const [open,setOpen] = useState(false);
    const [badge,setBadge] = useState(0);    

    useEffect(()=>{
        let data = localStorage.getItem('shoppingCartDB');
        if(!data) 
        data = {}
        else
        data = JSON.parse(data)
        setBadge(Object.keys(data).length)
    },[badge])

    useEffect(
        ()=>{
            window.addEventListener('click',e=>{

            })
            window.removeEventListener('click')
        }
    )

    function loginHandeler(){
        setOpen(true);
    }

    function SimpleDialog(props){
        const { open,setOpen } = props;
        const [userName,setUserName] = useState('');
        const [password,setPassword] = useState('');

        async function handeler(){
            const res = await fetch(`api/user/${userName}/password/${password}`)
            if (res.status==200){
                const data = await res.json();
                const jObj = JSON.stringify(data)
                localStorage.setItem('userDB',jObj)
                router.reload(window.location.pathname)
            }else{
                alert('invalid username/password');
            }
            setOpen(false)
        }

        return(
            <Dialog open={props.open}>
                <DialogTitle>Log in</DialogTitle>
                <Box>
                    <InputLabel>username:</InputLabel>
                    <TextField id='username' value={userName} onChange={e=>{setUserName(e.currentTarget.value)}}></TextField>
                    <InputLabel>password:</InputLabel>
                    <TextField id='password' value={password} onChange={e=>{setPassword(e.currentTarget.value)}}></TextField>
                    <Button onClick={e=>{handeler()}}>Log in</Button>
                </Box>
            </Dialog>
        )
    }

    
    return(
        <Box sx={{
            width:'100%',
            borderStyle:'solid',
            display:'flex',
            flexWrap:'nowrap',
            borderBottom:1,
            borderTop:0,
            borderLeft:0,
            borderRight:0,
          }}>
            {(!isLogin)
            ?
            <Button variant="contained" onClick={e=>{loginHandeler()}} startIcon={<MenuIcon />}>Log in</Button>
            :
            <Button variant="contained" onClick={e=>{confirm(`balance: ${parseFloat(user.balance).toFixed(2)}$`)}} startIcon={<MenuIcon />} sx={{flexDirection:'column'}} >{user.name}</Button>
            }
            <IconButton onClick={e=>{router.push(`shoppingcart`)}}>
                <Badge badgeContent={badge} color ='secondary'>
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <SimpleDialog open={open} setOpen={setOpen}></SimpleDialog>
            <Button variant='text' onClick={e=>{router.push(`/`)}} alignself={'center'} align={'center'} sx={{flex:1,fontSize:'24px',minWidth:'110px'}}><HomeIcon/><b>AirLine</b></Button>
            <Button variant="contained" onClick={e=>{router.push(`assistant`)}} startIcon={<MenuIcon />} sx={{flexDirection:'column'}}>Assistant</Button>
            <Button variant="contained" onClick={e=>{router.push(`emergency`)}} color='error' startIcon={<MenuIcon />} sx={{flexDirection:'column'}}>Emergency</Button>
        </Box>
    )
}