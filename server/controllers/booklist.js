const { mysql } =require('../qcloud');
module.exports =async (ctx)=>{
    const {page,openId}=ctx.request.query
    const size=10
    let books;
    if (openId) {
         books =await mysql('books')
                    .select('books.*','cSessionInfo.user_info')
                    .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                    .orderBy('books.id','desc')
                    .where('openid',openId)   
    }else{
         books =await mysql('books')
                    .select('books.*','cSessionInfo.user_info')
                    .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                    .limit(size)
                    .offset(Number(page)*size)
                    .orderBy('books.id','desc');
    }
    
    ctx.state.data={
        list:books.map((book)=>{
            const info=JSON.parse(book.user_info)
            return Object.assign({},book,{
                user_info:{
                    nickName:info.nickName
                }
            })
        })
    }

}