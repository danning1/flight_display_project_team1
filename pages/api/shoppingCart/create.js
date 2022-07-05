import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const {name,price} = req.body;

    const find_unique = await prisma.shoppingCart.findUnique({
        where:{
            name:name,
        },
    });

    if(find_unique){
        await prisma.shoppingCart.update({
            where:{
                name:name,
            },
            data:{
                count:find_unique.count+1,
            }
        })
    }else{
        await prisma.shoppingCart.create(
            {
                data:{
                    name:name,
                    price:price,
                    count:1
                }
            }
        )
    }

    res.json(200);
}