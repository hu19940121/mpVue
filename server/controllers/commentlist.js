//

const {mysql} =require('../qcloud');
module.exports=async (ctx)=>{
    const { bookId ,openId} =ctx.request.query;
    console.log('bookid',bookId);
    console.log('openid',openId);
    
    const selectMysql= mysql('comments')
                        .select('comments.*','cSessionInfo.user_info')
                        .join('cSessionInfo','comments.openId','cSessionInfo.open_id')
        
                    // .where('comments.bookId',bookId)
    let list;
    if (bookId) {
         list=await selectMysql.where('bookId',bookId)
    }else if (openId) {
         list=await selectMysql.where('openId',openId)
    }

    ctx.state.data={
        list:list.map((v)=>{
            const userInfo=JSON.parse(v.user_info)
            return Object.assign({},v,{
                user_info:{
                    nickName:userInfo.nickName,
                    avatarUrl:userInfo.avatarUrl,
                }

            })
        })
    }

}