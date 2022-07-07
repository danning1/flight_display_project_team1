import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const {id} = req.query;
    const find_all = await prisma.shoppingHistory.findMany({
        where:{
            userId:parseInt(id)
        }
    });
    res.json(find_all);
}