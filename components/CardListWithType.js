import { Card, Box, Typography, CardActionArea, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
export default function CardListWithType({data,data_type,currentTab}){
    const router = useRouter()
    const [isFetching,setIsFetching] = useState(false);
    const [item,setItem] = useState(null);
    function onclickHandeler(el){
        setItem(el);
        if(currentTab=='movie'){
            router.push(`/${currentTab}/[id]`,`/${currentTab}/${el.id}`)
        }else if(currentTab=='menu'){
            setIsFetching(true);
        }
    }


    useEffect(()=>{
        if(isFetching){
            setIsFetching(false);
            fetch(`/api/shoppingCart/create`,{
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name:item.name,price:item.price})
                })
        }
    },[isFetching])

    const data_map = Object.keys(data).map(type=>
            <React.Fragment key={type}>
                <Typography variant="h4" sx={{width:'100%',height:'50px'}}>{data_type[type].name}:</Typography>
                {data[type].map(
                    el=>
                            <React.Fragment key={el.name}>
                                <Card  sx={{flex:1/4,margin:"10px",height:'200px',minWidth:"300px",display:'flex',flexDirection:'column'}}>
                                    <CardActionArea sx={{flex:4/5,display:'flex',flexDirection:'column'}} onClick={e=>{onclickHandeler(el)}}>
                                        <Typography  variant="h4" sx={{borderBottom:1,flex:1/4,width:'100%'}}>{el.name}</Typography>
                                        <Typography variant='body1' sx={{flex:3/4,alignSelf:'start'}}>&emsp;{el.desc}</Typography>
                                    </CardActionArea>
                                    <Box sx={{flex:1/5,display:'flex',flexDirection:'row-reverse',backgroundColor:'rgb(161, 175, 188)'}}>
                                        {(el.price)
                                        ?
                                        <Typography variant="h6" sx={{alignSelf:'center',padding:'2px'}}>{el.price}$</Typography>
                                        :
                                        <React.Fragment>
                                        </React.Fragment>}
                                    </Box>
                                </Card>
                            </React.Fragment>
                )}
            </React.Fragment>
        )
    return(
        <Box sx={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
                {data_map}
        </Box>
    )
}


