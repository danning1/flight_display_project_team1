import { Button, Dialog, DialogTitle, IconButton, TextField, Modal, Box, Badge, InputLabel,Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home'
import styles from '../styles/Osman.button.module.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function NavBar({user, isLogin}){
    const router = useRouter();
    const [loginSwitch,setLoginSwitch] = useState(false);
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
            window.addEventListener('storage',()=>{
                console.log('storage event')
                setBadge(0);
            })
        
            return ()=>{
              window.removeEventListener('storage',()=>{});
            }
        }
    )

    //Osman start
    const [open, setOpen] = useState(false);
    const [openFlight, setOpenFlight] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseFlight = () => setOpenFlight(false);
    const [audio, setAudio] = useState(null)
    const [audioFlight, setAudioFlight] = useState(null)
    useEffect(() => {
        const audioVar = new Audio('/emergencyCall.mp3')
        const audioFlightVar = new Audio('/call.mp3')
        setAudio(audioVar)
        setAudioFlight(audioFlightVar)
        let loyaltyData = localStorage.getItem('loyaltyData')
        if (loyaltyData) {
        console.log("loyaltyData", loyaltyData)
        loyaltyData = JSON.parse(loyaltyData)
        }
        else {
        loyaltyData = 100
        localStorage.setItem('loyaltyData', JSON.stringify(loyaltyData))
        }
    }, [])
  //Osman end

    function loginHandeler(){
        setLoginSwitch(true);
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
            <SimpleDialog open={loginSwitch} setOpen={setLoginSwitch}></SimpleDialog>
            <Button variant='text' onClick={e=>{router.push(`/`)}} alignself={'center'} align={'center'} sx={{flex:1,fontSize:'24px',minWidth:'110px'}}><HomeIcon/><b>AirLine</b></Button>
            <Button variant="contained" onClick={() => {
            audioFlight.play();
            audioFlight.onended = () => {
                setOpenFlight(true)
            }
            }} startIcon={<MenuIcon />} sx={{flexDirection:'column'}}>Assistant</Button>
            <Button variant="contained" onClick={() => {
            audio.play();
            audio.onended = () => {
                setOpen(true)
            }
            }} color='error' startIcon={<MenuIcon />} sx={{flexDirection:'column'}}>Emergency</Button>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tell us What is your Emergency
          </Typography>

          <input type="text" name="text" className={styles.input} placeholder="Type here!"></input>
          <Button className={styles.submitButton} onClick={handleClose}>Submit</Button>
        </Box>
      </Modal>
      <Modal
        open={openFlight}
        onClose={handleCloseFlight}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thanks for Calling
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Tell us how can we assist you?
          </Typography>
          <Button onClick={handleCloseFlight}>Close</Button>
        </Box>
      </Modal>
        </Box>
    )
}