import { Button, IconButton, Input } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import styles from './HeadBar.module.css'

import AirlinesIcon from '@mui/icons-material/Airlines'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function HeadBar({header_name,top_height,headBar_height_state,set_headBar_height_state}){
    const headbar_main = useRef(null);
    function handleOnClick(state,setState){
        if(state&&1){
            setState(0)
        }else{
            setState(1)
        }
    }

    console.log(top_height)

    return(
        <React.Fragment>
            <Box ref={headbar_main} id="headbar_main" className={`${styles.main}`} sx={{
                height:top_height,
            }}>
                <div className={`${styles.main_upper}`}>
                    <div className={`${styles.flex_left}`}>
                        <IconButton onClick={(e)=>{handleOnClick(headBar_height_state,set_headBar_height_state)}}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <div><a>Home</a></div>
                        <div className={`${styles.currentName}`}><p>{header_name}</p></div>
                    </div>
                    <div className={`${styles.flex_right}`}>
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                    </div>
                </div>
                <div className={`${styles.main_dropdown}`}>
                    <p>Flight Number: xxxxxxxxx1</p>
                </div>
            </Box>
        </React.Fragment>
    )
}