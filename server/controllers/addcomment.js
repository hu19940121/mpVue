//


const {mysql } = require('../qcloud');
module.exports = async (ctx)=>{
    const {bookId,comment,openId,location,phone} =ctx.request.body;
    try{
        const res= await mysql('comments').select('*').where('bookId',bookId).where('openId',openId).first();
        console.log(res);
        if (res) {
            ctx.state={
                code:-2,
                data:{
                    msg:'请勿重复评价'
                }
            }           
        }else{
            await mysql('comments').insert({bookId,comment,openId,location,phone})
            ctx.state.data={
                msg:'添加成功'
            }

        } 

    }catch(error){
        console.log(error);
        
        ctx.state={
            code:-1,
            data:{
                msg:'fail'
            }
        }
    }

    // console.log(bookId,comment,openId,location,phone);
    

}