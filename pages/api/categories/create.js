import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const {name} = req.body;
    const create = await prisma.category.create({
        data:{
            name:name,
        },
    });
    res.json(create);
}