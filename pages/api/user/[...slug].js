import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const {slug} = req.query;

    // 0 : id // 1: balance change
    if (slug.length==2){
        const user = await prisma.user.findUnique({
            where:{
                id: slug[0],
            }
        });
        let val = parseFloat(slug[1]).toFixed(2);
        val += user.balance;
        const update = await prisma.user.update({
            where:{
                id: slug[0],
            },
            data:{
                balance:val,
            }
        });
        res.status(200);
    }else if(slug.length==1){
        const user = await prisma.user.findUnique({
            where:{
                id: slug[0],
            }
        });
        res.json(user);
    } 
}