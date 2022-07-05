import React, { useState } from "react";
import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, IconButton } from "@mui/material";
import Paper from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { useRouter } from "next/router";

export default function CartHome(props){
    const [data,setData] = useState(props.cart);
    const router = useRouter()
    return(
        <React.Fragment>
        <Box sx={{
          width:"100%",
          display:"flex",
          minHeight:"100%",
          flexDirection:"column",
        }}>

          {/* navbar */}
          <Box sx={{
            height:"60px",
            backgroundColor:"gray",
          }}>
          </Box>

          {/*Body*/}
          <Box sx={{
            flex:1,
            backgroundColor:"white",
            display:"flex",
            flexDirection:"row",
          }}>
            <TableContainer component={Paper}>
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
                        {data.map((el)=>
                            <TableRow key={el.id}>
                                <TableCell>{el.name}</TableCell>
                                <TableCell>{el.price}</TableCell>
                                <TableCell>
                                <IconButton><ArrowLeftIcon></ArrowLeftIcon></IconButton>
                                {el.count}
                                <IconButton><ArrowRightIcon></ArrowRightIcon></IconButton>
                                </TableCell>
                                <TableCell>{(el.price*el.count).toFixed(2)}</TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>

          </Box>
        </Box>
    </React.Fragment>
    )
}

export async function getStaticProps(){
  const res = await fetch(`${process.env.HOST}/api/shoppingCart/read`)
  const cart = await res.json();
  return{
    props:{cart:cart},
  }
}