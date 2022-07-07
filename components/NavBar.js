import { Button, Dialog, DialogTitle, IconButton, TextField, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuIcon from '@mui/icons-material/Menu';
import { Label } from "@mui/icons-material";

export default function NavBar({user, isLogin}){
    const router = useRouter();
    const [open,setOpen] = useState(false);
    const [count,setCount] = useState(0);
    

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
            }
            setOpen(0)
        }

        return(
            <Dialog open={props.open}>
                <DialogTitle>Log in</DialogTitle>
                <Box>
                    <Label>username:</Label>
                    <TextField id='username' value={userName} onChange={e=>{setUserName(e.currentTarget.value)}}></TextField>
                    <Label>password:</Label>
                    <TextField id='password' value={password} onChange={e=>{setPassword(e.currentTarget.value)}}></TextField>
                    <Button onClick={e=>{handeler()}}>Log in</Button>
                </Box>
            </Dialog>
        )
    }

    
    return(
        <Box sx={{
            backgroundColor:"gray",
            display:'flex',
            flexWrap:'wrap',
          }}>
            {(!isLogin)
            ?
            <Button variant="contained" onClick={e=>{loginHandeler()}} startIcon={<MenuIcon />}>Log in</Button>
            :
            <Typography  sx={{padding:'8px',align:'center',alignSelf:'center'}}>Wellcome {user.name}({parseFloat(user.balance).toFixed(2)}$)</Typography>
            }
            <Button variant="contained" onClick={e=>{router.push(`shoppingcart`)}} startIcon={<MenuIcon />}>Cart</Button>
            <SimpleDialog open={open} setOpen={setOpen}></SimpleDialog>
            <Button variant="outlined" onClick={e=>{router.push(`/`)}} alignself={'center'} align={'center'} sx={{flex:1,fontSize:'24px',color:'white'}}><b>AirLine</b></Button>
            <Button variant="contained" onClick={e=>{router.push(`assistant`)}} startIcon={<MenuIcon />}>Assistant</Button>
            <Button variant="contained" onClick={e=>{router.push(`emergency`)}} color='error' startIcon={<MenuIcon />}>Emergency</Button>
        </Box>
    )
}