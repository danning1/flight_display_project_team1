import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const {name} = req.body;
    const remove = await prisma.category.delete({
        where:{
            name:name,
        }
    });
    res.json(remove);
}