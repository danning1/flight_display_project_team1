
import styles from './Display.module.css'
import * as React from "react"
import { Card, CardContent, Typography } from '@mui/material'
const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{
        fontSize:14
      }} variant="body1">
        Item
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function DisplayWindow(props){
    return (
        <div className={`${styles.display_window}`}>
          <div className={`${styles.nav_bar}`}>
            <div className={`${styles.categoty_name}`}>{props.category} (screen_width:{props.screensize})</div>
          </div>
          <div className={`${styles.inner_window}`}>
            <Card className={`${styles.item}`}>{card}</Card>
            <Card className={`${styles.item}`}>{card}</Card>
            <Card className={`${styles.item}`}>{card}</Card>
            <Card className={`${styles.item}`}>{card}</Card>
            <Card className={`${styles.item}`}>{card}</Card>
            <Card className={`${styles.item}`}>{card}</Card>
          </div>
        </div>
    )
}