import * as React from "react"

import styles from './Side.module.css'

import MovieIcon from '@mui/icons-material/Movie'
import GameIcon from '@mui/icons-material/Games'
import FlightIcon from '@mui/icons-material/Flight'
import FoodIcon from '@mui/icons-material/Restaurant'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, IconButton } from "@mui/material"

export default function SideBar(props){

    
  return(
    <div className={`${styles.side_div}`}>
        <IconButton disabled>
          <MenuIcon />
        </IconButton>
      <div className={`${styles.side_bar}`}>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="movie" onClick={()=>props.setCategory('Movie')}>
        <MovieIcon/>
          Movie
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="game" onClick={()=>props.setCategory('Game')}>
          <GameIcon />
          Game
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="food" onClick={()=>props.setCategory('Food')}>
          <FoodIcon />
          Food
        </IconButton>
        {/* <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton>
        <IconButton sx={{
          fontSize:'8px',
          flexDirection:'column'
        }} aria-label="flight" onClick={()=>props.setCategory('Flight')}>
          <FlightIcon />
          Flight
        </IconButton> */}
      </div>
      <IconButton>
        <MenuIcon/>
      </IconButton>
    </div>
  )
}