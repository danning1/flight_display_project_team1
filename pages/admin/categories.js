import { Box, IconButton, TextField, Card, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update'


function CategoryAdmin(props){
    const [categories,setCategories] = useState(null);
    const [reloading,setReloading] = useState(0);
    const [response,setResponse] = useState(null);

    const [addTextField,setAddTextField] = useState('');
    const [deleteTextField,setDeleteTextField] = useState('');
    const [updateTextField,setUpdateTextField] = useState('');

    const [addController,setAddControler] = useState(0);
    const [deleteController,setDeleteControler] = useState(0);
    const [updateController,setUpdateControler] = useState(0);

    const [isLoading,setLoading] = useState(false);

    function handlerAdd(){
        setAddControler(1)
    }
    function handlerDelete(name){
        console.log('name',name)
        setDeleteTextField(name)
        setDeleteControler(1)
    }
    function handlerUpdate(name){
        setUpdateTextField(name)
        setUpdateControler(1)
    }
    // create
    useEffect(
        ()=>{
            if(addController==1){
                fetch(`/api/categories/create`,{
                    method : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({name:addTextField})
                    }).then(()=>setReloading(reloading+1))
                setAddControler(0)
            }else if(deleteController==1){
                fetch(`/api/categories/delete`,{
                    method : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({name:deleteTextField})
                    }).then(()=>setReloading(reloading+1))
                setDeleteControler(0)
            }else if(updateController==1){
                fetch(`/api/categories/update`,{
                    method : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({name:updateTextField,newName:addTextField})
                    }).then(()=>setReloading(reloading+1))
                setUpdateControler(0)
            }
        },[addController,deleteController,updateController]
    )
    // read
    useEffect(
        ()=>{
            setLoading(true)
                fetch(`/api/categories/read`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        setCategories(data)
                        setLoading(false)
                })
        },[reloading]
    )

    if (isLoading) return <p>Loading...</p>

    if (!categories) return <p>No profile data</p>
    
    return(
        <React.Fragment>
            <Box>Category:</Box>
            <IconButton id="add" onClick={()=>handlerAdd()}>
                <AddIcon/>
            </IconButton>
            <TextField onChange={e => setAddTextField(e.currentTarget.value)}></TextField>
            <Box sx={{display:"flex",flexDirection:"row"}}>
                {categories.map(el=>
                    <Card key={el.name} sx={{flex:1/3}}>
                        <Typography variant="h2">{el.name}</Typography>
                        <IconButton value={el.name} onClick={e=>handlerDelete(e.currentTarget.value)}><DeleteIcon/></IconButton>
                        <IconButton value={el.name} onClick={e=>handlerUpdate(e.currentTarget.value)}><UpdateIcon/></IconButton>
                    </Card>
                )}
            </Box>
        </React.Fragment>
    )
}

export default CategoryAdmin;