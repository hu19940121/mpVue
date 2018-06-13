
const {mysql} = require('../qcloud')
module.exports = async(ctx)=>{
    imgInfo= await mysql('books')
            .select('id','image')
            .limit(9)
            .orderBy('count','desc')
            console.log(imgInfo);
            
    ctx.state.data={
        data:[ imgInfo.slice(0,3), imgInfo.slice(3,6),imgInfo.slice(6,9)]
    }
}