import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const {name,newName} = req.body;
    const update = await prisma.category.update({
        where:{
            name:name,
        },
        data:{
            name:newName,
        }
    });
    res.json(update);
}