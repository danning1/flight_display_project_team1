import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, IconButton, Button, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import NavBar from "../../components/NavBar";
import html2canvas from 'html2canvas'


export default function ShoppingHistory(){
    const [history,setHistory] = useState(null);
    const [isHistory,setIsHistory] = useState(false);

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
        fetch(`/api/shoppingHistory/${data.id}`)
        .then(res=>res.json())
        .then((d)=>{
            setHistory(d);
            setIsHistory(true);
        }).catch()

      }
    },[]);

    useEffect(()=>{
        if(isLogin&&isHistory){

        const capture = () => {
          html2canvas(document.getElementById("html2canvasbd")).then(function(canvas) {
            document.body.appendChild(canvas);
          });
        }

        const exportAsPicture = () => {
            // var html = document.getElementsByTagName('HTML')[0]
            // var body =  document.getElementsByTagName('BODY')[0]
            // var htmlWidth = html.clientWidth;
            // var bodyWidth = body.clientWidth;
            // var data = document.getElementById('exportContainer')
            // var newWidth = data.scrollWidth - data.clientWidth
            // if (newWidth > data.clientWidth){
            //   htmlWidth += newWidth
            //   bodyWidth += newWidth
            // }
            // html.style.width = htmlWidth + 'px'
            // body.style.width = bodyWidth + 'px'
            // html2canvas(data).then((canvas)=>{
            //   var image = canvas.toDataURL("image/jpeg", 1.0);
            //   console.log(image)
            //   var fileName = 'text.jpg'
            //     saveAs(image, fileName)
            // })
            html2canvas(document.getElementById("html2canvasbd")).then((canvas) => {
                var image = canvas.toDataURL("image/jpeg", 1.0);
                var fileName = 'text.jpg'
                saveAs(image, fileName)
              });
          }

          const saveAs = (blob, fileName) =>{
            var elem = window.document.createElement('a');
            elem.href = blob
            elem.download = fileName;
            elem.style = 'display:none;';
            (document.body || document.documentElement).appendChild(elem);
            if (typeof elem.click === 'function') {
              elem.click();
            } else {
              elem.target = '_blank';
              elem.dispatchEvent(new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
              }));
            }
            URL.revokeObjectURL(elem.href);
            elem.remove()
          }

          document.getElementById("capture").addEventListener('click',()=>{capture()});
          document.getElementById("exportAsPicture").addEventListener('click',()=>{exportAsPicture()});
        }
        })



    if(isLogin&&isHistory){
        return(
            <React.Fragment>
                <Box sx={{
                width:"100%",
                display:"flex",
                minHeight:"100%",
                flexDirection:"column",
                }}>
                    <NavBar user={user} isLogin={isLogin}></NavBar>
                    <Box id = 'html2canvasbd'>
                        {history.map((element)=>{
                        let content = JSON.parse(element.content);
                        return(
                            <Box id={element.id} key={element.id}>
                            <Typography>Order Number:{element.id}</Typography>
                            <TableContainer  sx={{flex:'auto'}}>
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
                                        {Object.keys(content).map((el)=>
                                            <TableRow key={el}>
                                                <TableCell>{content[el].name}</TableCell>
                                                <TableCell>{content[el].price}$</TableCell>
                                                <TableCell>
                                                {content[el].count}
                                                </TableCell>
                                                <TableCell>{(content[el].price*content[el].count).toFixed(2)}$</TableCell>
                                            </TableRow>)
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>)})}
                    </Box>
                    <Button variant="contained" id='capture' value="capture">capture</Button>
                    <Button variant="contained" id='exportAsPicture' value="exportAsPicture">exportAsPicture</Button>
                    <Box id='exportContainer'></Box>
                </Box>
            </React.Fragment>
        )
    }else{
        return(
            <React.Fragment>
                <Box sx={{
                width:"100%",
                display:"flex",
                minHeight:"100%",
                flexDirection:"column",
                }}>
                    <NavBar user={user} isLogin={isLogin}></NavBar>
                    <p>no data or user not login</p>
                </Box>
            </React.Fragment>
        )
    }
    
}

