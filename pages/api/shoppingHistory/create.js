import prisma from "../../../components/prismaClient.js"

export default async function handler(req, res) {
    console.log('api/shoppingHistory/create')
    const {data,userId} = req.body;
    if (Object.keys(data).length>0){
        const create = await prisma.shoppingHistory.create({
            data:{
                userId:userId,
                content:JSON.stringify(data),
            }
        });
        res.json(create);
    }
    res.status(400)
}