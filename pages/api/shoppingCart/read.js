import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const find_all = await prisma.shoppingCart.findMany();
    res.json(find_all);
}