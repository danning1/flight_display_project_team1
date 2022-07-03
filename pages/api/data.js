// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../components/prismaClient.js"
export default async function handler(req, res) {
    const {t,b} = req.body;
    console.log("t:",t)
    console.log('b:',b)
    if(t==0){
        const create = await prisma.category.create({
            data:{
                name:b
            }
        });
        res.json(create);
    }else if(t==1){
        const find_all = await prisma.category.findMany();
        res.json(find_all);
    }
    else if(t==2){
        const remove = await prisma.category.delete({
            name:b,
        });
        res.json(remove);
    }
    else if(t==3){
        const update = await prisma.category.update({
            name:b,
        });
        res.json(update);
    }else{
        res.status(400);
        res.send("bad request");
    }
}
