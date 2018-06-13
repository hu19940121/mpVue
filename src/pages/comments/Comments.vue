<template>
    <div class="myComments">
        <div  v-if="!showUnlogin">
            <CommentList :comments="comments" />
            <div  class="mybooks">
                <div class="mybooks-title">
                我的图书
                </div>
                <Card   v-for="book in books" :key="book.id" :book='book' />
            </div>             
        </div>
        <div v-else class="unlogin">
            未登录
        </div>
       
    </div>
</template>

<script>
import CommentList from '@/components/CommentList';
import Card from '@/components/Card'
import {get} from '@/untils';

    export default {
        data(){
            return{
                showUnlogin:false,
                openId:'',
                comments:[],
                books:[],
                
            }
        },
        onShow(){
            this.getUserOpenId()
            if (this.openId) {
               
                this.getComments()
                this.getBooks()
                
            }
        },
        methods:{
           async getComments(){
                const res=await get('/weapp/commentlist',{openId:this.openId})
                this.comments=res.data.list
                console.log(this.comments);
            },
            getUserOpenId(){
                this.openId=wx.getStorageSync('userInfo').openId;
                console.log(this.openId);
                
                //是否显示未登录
                if (!this.openId) {
                    this.showUnlogin=true
                }else{
                    this.showUnlogin=false;
                } 
            },
            async getBooks(){
                const res=await get('/weapp/booklist',{openId:this.openId})
                console.log(res);
                this.books=res.data.list;
                
            }
        },

        components:{
            CommentList,
            Card
        }
    }
</script>

<style lang="scss">
    .myComments{
        .unlogin{
            text-align: center;
            padding: 50rpx 0 0 0;
            color:brown;
        }
        .mybooks{
            padding-left: 20rpx;
            margin-bottom: 20rpx; 
            background-color: #eeeeee;
            height: 78rpx;
            line-height: 78rpx;
        }
    }
</style>