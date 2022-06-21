import styles from '../styles/Home.module.css'
import { useEffect, useState, useRef } from 'react'
import * as React from 'react';
//components
import SideBar from '../components/SideBar';
import DisplayWindow from '../components/DisplayWindow';

export default function Home() {
  const [screenWidth,setScreenWidth]= useState(0)
  const [category, setCategory] = useState('Movie')
  
  useEffect(()=>{
    const handleResize = () => setScreenWidth(window.screen.width)
    window.addEventListener('resize',handleResize)
    return () =>window.removeEventListener('resize',handleResize);
  },[])

  return (
    <div className={`${styles.main_window}`}>
      <div className={`${styles.body_window}`}>
        <SideBar setCategory={setCategory}></SideBar>
        <DisplayWindow category={category} screensize={screenWidth}></DisplayWindow>
      </div>
    </div>
  )
}
