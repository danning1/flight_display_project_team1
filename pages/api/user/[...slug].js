import prisma from "../../../components/prismaClient.js"
export default async function handler(req, res) {
    const {slug} = req.query;
    // 0 : id // 1: balance change // 2: password
    if (slug.length==2){
        const user = await prisma.user.findUnique({
            where:{
                id: parseInt(slug[0]),
            }
        });
        let val = parseFloat(slug[1]);
        if (val<0){
            val = val*-1;
        }

        if(user.balance<val){
            res.body('not enough balance.')
            res.status('406')
        }else{
            val = user.balance - val;
            const update = await prisma.user.update({
            where:{
                id: parseInt(slug[0]),
            },
            data:{
                balance:val,
            }
            });
            res.json(update);
        }
        
    }else if(slug.length==1){
        const user = await prisma.user.findUnique({
            where:{
                id: parseInt(slug[0]),
            }
        });
        res.json(user);
    }else if(slug.length==3){
        if(slug[1]=='password'){
            const user = await prisma.user.findFirst({
                where:{
                    name: slug[0],
                    password: slug[2],
                }
            });
            res.json(user);
        }else{
            res.status(400)
        }
    }else{
        res.status(400)
    }
}