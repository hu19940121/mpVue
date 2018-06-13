//新增图书


//1.先获取豆瓣信息
//2.入库
// import axios from 'axios'
const axios =require('axios');
const { mysql } =require('../qcloud');
module.exports=async(ctx)=>{
    const {isbn,openid}=ctx.request.body
    if (isbn && openid) {
        //查看数据库是否已经存在图书
        const findRes=await mysql('books').select().where('isbn',isbn);
        if (findRes.length) {
            ctx.state={
                code:-1,
                data:{
                    msg:"图书已存在"
                }
            }
            return;
        }
         //获取豆瓣数据
        await axios.get(`https://api.douban.com/v2/book/isbn/${isbn}`)
            .then(async function (response) {
                const bookInfo=response.data;//获取图书信息
                //取出入库的数据
                const rate=bookInfo.rating.average;
                const{title,image,alt,publisher,summary,price}=bookInfo;
                //将标签数组转为字符串  好存储在数据库
                const tags=bookInfo.tags.map((v)=>{
                    return `${v.title}${v.count}`
                }).join(',')
                const author=bookInfo.author.join(',')
                try {
                    await mysql('books').insert({
                        isbn,openid, rate,title,image,alt,publisher,summary,price,tags,author
                     })
                     ctx.state.data={
                         title,
                         msg:'success'
                     }    
                } catch (error) {
                    ctx.state={
                        code:-1,
                        data:{
                            msg:'新增失败:'+error.sqlMessage
                        }
                    }
                }
               
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
}