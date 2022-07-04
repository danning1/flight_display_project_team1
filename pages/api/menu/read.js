import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const find_groups = await prisma.menu.groupBy({
        by: ['type'],
    });
    let menus = {}
    
    await Promise.all(find_groups.map(el=> 
         new Promise((resolve, reject)=> {
              prisma.menu.findMany({
                where:{
                    type:el.type
                }
            }).then(i=> {menus[el.type] =i; resolve();}).catch(()=> reject())
    })))
    
    // for(let i=0;i < find_groups.length; i++){
    //     movies[find_groups[i].type] = await prisma.movie.findMany({
    //         where:{
    //             type:find_groups[i].type
    //         }
    //     })
    // }

    res.json(menus)
}