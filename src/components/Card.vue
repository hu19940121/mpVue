<template>
    <div class="book-card" @click="goDetail(book.id)">
        <div class="thumb" @click.stop="previewImage(book.image)">
            <img :src="book.image" class='image'  alt="">
        </div>
        <div class="detail">
            <div class="row">
                <div class="right defaultColor">
                    {{book.rate}}
                    <Rate :value='book.rate/2'/>
                </div>
                <div class="left defaultColor">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                   {{book.count}}
                </div>
                <div class="left">
                    {{book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                   {{book.user_info.nickName}}
                </div>
                <div class="left">
                   {{book.publisher}}
                </div>
            </div>                        
        </div>
    </div>
</template>

<script>
import Rate from '@/components/Rate'
// import Rate from 'vue-tiny-rate';
    export default {
        props:['book'],
        methods:{
            goDetail(id){
                wx.navigateTo({
                    url: '/pages/bookdetail/main?id='+id,
                    success: function(res){
                        // success
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                })
            },
            previewImage(url){
                console.log(url);
                
                wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: [url] // 需要预览的图片http链接列表
                })
            }
        },


        components:{
          Rate  
        }
    }
</script>

<style scoped>
.detail{overflow: hidden;}
.book-card{
    padding: 5rpx;
    overflow: hidden;
    margin-top: 10rpx;
    margin-bottom: 5rpx;
    font-size: 32rpx;
}
.book-card .thumb{
    width: 160rpx;
    height: 200rpx;
    float: left;
    margin-right: 20rpx;
    margin-left: 20rpx;
    background-color:red;
}
.book-card .thumb img{width: 100%;height: 100%;}
.row{overflow: hidden;margin-bottom: 5rpx;}
.row .right{float: right;margin-right: 10rpx;}
.row .left{float: left;font-size: 32rpx;width: 300rpx;}
  .defaultColor{
    color: #EA5149;
  }
</style>