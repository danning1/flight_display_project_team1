import React, { useEffect, useState } from "react";
import styles from '../../styles/style.game.module.css'
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import tetris from "../../pages/game/tetris.jpg";
import bananagrams from '../../pages/game/bananagrams.jpg'
import battleship from '../../pages/game/battleship.jpg'
import millionare from '../../pages/game/millionare.jpg'
import threes from '../../pages/game/threes.png'
import Image from 'next/image'

export default function GameHome(props){
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
          
          <section className ={styles.frames}>
                <section className={styles.container}>
                    <div className={styles.imgContainer}>
                        <div className={styles.imgContainer}>
                          <Image src={tetris} alt="tetris"width={500}
        height={500} />
                        </div>
                    </div>
                    <section className={styles.firstHalf}>

                     
                        <h1 className={styles.title}>
                
                          <a className={styles.myLink} href = "https://jstris.jezevec10.com/">

                          <u>Tetris</u>
                          </a>
                        </h1>
                        
                        <p className={styles.gameDesc}>
                        Tetris is a puzzle video game requiring 
                        players to strategically move, rotate, 
                        and drop multiple Tetriminos falling into 
                        a rectangular Matrix at varying speed. 
                        Strategy and speed are essential when playing 
                        the game; whenever the Tetriminos exceeds the skyline, 
                        such a player has lost the game. Therefore, the game 
                        requires that you clear as many lines as possible.
                        </p>
                        
                    </section>
                </section>
            </section>
            <section className={styles.frames}>
                <section className={styles.container}>
                    <section className={styles.ImageContainer}>
                      <Image src={bananagrams} alt="bananagrams" width={368}
        height={368}/>
                    </section>
                    <section className={styles.firstHalf}>

                     
                        <h1 className={styles.title}>
                          <a className={styles.myLink} href = "https://www.playbananagrams.com/game/bananaIsland">

                          <u>Bananagrams</u>
                          </a>
                        </h1>
                        
                        <p className={styles.gameDesc}>
                        Bananagrams is based on arranging one's tiles 
                        into a grid of connected words faster than 
                        one's opponents. The object of the game is to 
                        be the first to complete a word grid after the 
                        pool of tiles has been exhausted. The tiles 
                        come in a fabric banana-shaped package.
                        </p>
                        
                    </section>
                </section>
            </section>
            
            <section className={styles.frames}>
                <section className={styles.container}>
                    <section className={styles.ImageContainer}>
                      <Image src={battleship} alt="battleship" width={473}
        height={400}/>
                    </section>
                    <section className={styles.firstHalf}>

                     
                        <h1 className={styles.title}>
                          <a className={styles.myLink} href = "http://en.battleship-game.org/">

                          <u>Battleship</u>
                          </a>
                        </h1>
                        
                        <p className={styles.gameDesc}>
                        Battleship is a strategy type guessing game 
                        for two players. It is played on ruled grids 
                        on which each player's fleet of warships are marked. 
                        The locations of the fleets are concealed from the 
                        other player. Players alternate turns calling "shots" 
                        at the other player's ships, and the objective of the 
                        game is to destroy the opposing player's fleet.
                        </p>
                        
                    </section>
                </section>
            </section>
            
            <section className={styles.frames}>
                <section className={styles.container}>
                    <section className={styles.ImageContainer}>
                      <Image src={millionare} alt="millionare" width={200}
        height={150} />
                    </section>
                    <section className={styles.firstHalf}>

                     
                        <h1 className={styles.title}>
                          <a className={styles.myLink} href = "https://wwbm.com/">

                          <u>Who wants to be a millionare?</u>
                          </a>
                        </h1>
                        
                        <p className={styles.gameDesc}>
                        contestants tackle a series of multiple-choice 
                        questions to win large cash prizes in a format 
                        that twists on many game show genre conventions
                        </p>
                        
                    </section>
                </section>
                
            </section><section className={styles.frames}>
                <section className={styles.container}>
                    <section className={styles.ImageContainer}>
                      <Image src={threes} alt="threes" width={920}
        height={800}/>
                    </section>
                    <section className={styles.firstHalf}>

                     
                        <h1 className={styles.title}>
                          <a className={styles.myLink} href = "http://threesjs.com/">

                          <u>Threes!</u>
                          </a>
                        </h1>
                        
                        <p className={styles.gameDesc}>
                        The player slides numbered tiles on a four-by-four 
                        grid to combine addends and multiples of three.
                        For example, ones and twos merge to become a single 
                        "three" tile, two threes merge into "six", and two 
                        sixes merge into "12". Swiping the screen up, down, 
                        left, or right moves all of the tiles one square 
                        (if possible) on the grid in that direction and adds 
                        a new tile to the grid in the same direction. 
                        The color of the incoming tile is shown onscreen.
                        Players can preview moves by sliding the grid without 
                        letting go. Each kind of number tile has its own 
                        personality, and new kinds of number tiles are 
                        introduced with a screen full of confetti when first 
                        unlocked.
                        </p>
                        
                    </section>
                </section>
            </section>
            

        </Box>
    </React.Fragment>
    )
}

export async function getServerSideProps(){
  const res0 = await fetch(`${process.env.HOST}/api/movie/read`)
  const res1 = await fetch(`${process.env.HOST}/api/movie/readType`)
  const movie = await res0.json()
  const movieType = await res1.json()
  return{
    props:{movie:movie,movieType:movieType},
  }
}