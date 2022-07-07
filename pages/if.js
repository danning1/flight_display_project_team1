import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'

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
export default function WhatIf({ Component, pageProps }) {
  const [open, setOpen] = React.useState(false);
  const [openFlight, setOpenFlight] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseFlight = () => setOpenFlight(false);
  const [audio, setAudio] = useState(null)
  const [audioFlight, setAudioFlight] = useState(null)
  useEffect(() => {
    const audioVar = new Audio('/emergencyCall.mp3')
    const audioFlightVar = new Audio('/phoneCall.mp3')
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

  return (
    <>
      <center>

        <button className={styles.submitButton} onClick={() => {
          audio.play();
          audio.onended = () => {
            setOpen(true)
          }
        }}>
          Emergency Call
        </button>
        <button className={styles.submitButton} onClick={() => {
          audioFlight.play();
          audioFlight.onended = () => {
            setOpenFlight(true)
          }
        }}>
          Call Flight Attendant
        </button>
      </center>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tell us What's your Emergency
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
    </>
  )
}


