

//图书详情
const { mysql } =require('../qcloud');
module.exports=async(ctx)=>{
    const {bookId}=ctx.request.query;
    console.log(ctx.request.query);

    const bookInfo= await mysql('books')
                    .select('books.*','cSessionInfo.user_info')
                    .join('cSessionInfo','books.openid','cSessionInfo.open_id')  
                    .where('id',bookId) 
                    .first()  
    const user_info=JSON.parse(bookInfo.user_info)
        //浏览量自增1
    await mysql('books')
    .where('id',bookId)
    .increment('count',1);  
    ctx.state.data=Object.assign({},bookInfo,{
        tags:bookInfo.tags.split(','),
        summary:bookInfo.summary.split('\n'),
        user_info:{
            avatarUrl:user_info.avatarUrl,
            nickName:user_info.nickName
        }
    })

}