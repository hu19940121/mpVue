<template>
    <div v-if="isshow" class="book-detail">
        <div class="img-container">
            <div class="back">
                <img :src="bookInfo.image" mode="aspectFill" alt="">
            </div>
            <div class="info-container">
                <img :src="bookInfo.image"  alt="">
                <div class="author">{{bookInfo.author}}</div>
                <div class="title">{{bookInfo.title}}</div>
            </div>
            
        </div>
        <div class="row">
            <div class="left">
                <img :src="bookInfo.user_info.avatarUrl" alt="">
                <p class="nickName">{{bookInfo.user_info.nickName}}</p>
            </div>
            <div class="right">
               
                <p class="rating" >
                    {{bookInfo.rate}}分
                </p>
                <Rate :value="bookInfo.rate/2" />
            </div>
        </div>
        <div class="row">
            <div class="left">
                <p class="nickName">{{bookInfo.publisher}}</p>
            </div>
            <div class="right">
                <p class="rating">
                    {{bookInfo.price}}
                </p>
            </div>
        </div>
        <div class="tags">
            <span v-for="(tag,index) in bookInfo.tags" :key="index" class="tag">
                {{tag}}
            </span>
        </div> 
        <div class="summary-container">
            <h1>图书简介</h1>
            <p v-for="(summary,index2) in bookInfo.summary " :key="index2">
                {{summary}}
            </p>
        </div>
        <CommentList :comments="comments" />
        <div v-if="showAdd">
          <div class="comment">
              <textarea class="comment-textarea" v-model="comment" placeholder="请输入图书短评" />
          </div>
          <div class="phone">
              手机型号<switch  @change="getPhone"/>
              <span>{{phone}}</span>
          </div>
          <div class="location">
              地理位置<switch  @change="getLoc"/>
              <span>{{location}}</span>
          </div>
          <button class="btn" @click="addComment">添加评论</button>          
        </div>
        <div v-else class="footer-text">
            已评论或者未登录
        </div>
  
    </div>
</template>

<script>
import {get,post} from '@/untils';
import Rate from '@/components/Rate';
import CommentList from '@/components/CommentList';
import { showModal,showLoading } from '../../untils';
    export default {
        data(){
            return {
             bookId:'', //图书id
             bookInfo:{
                 user_info:{},
                 title:''

             },//图书信息
             phone:'', //手机型号
             location:'', //位置
             comment:'' ,//评论
             comments:[],
             isshow:false,
             userInfo:{}
            }
        },
        mounted(){
            this.getUserInfo()
            showLoading();
            this.bookId=this.$root.$mp.query.id
            this.bookdetail()  //获取图书详情
            this.getComments() //获取当前图书的评论
            //设置转发
            wx.showShareMenu({
                withShareTicket: true
            })
        
        },
        computed:{
            //判断是否让评论
            showAdd(){
                //未登录
                if (!this.userInfo) {
                    return false;
                }
                //是否已经评论过
               for (let i = 0; i < this.comments.length; i++) {
                  if (this.comments[i].openId==this.userInfo.openId) {
                      return false;
                  }
                   
               }

               return true;
            }

        },
        methods:{
            async bookdetail(){
            const detail=await get('/weapp/bookdetail',{bookId:this.bookId})

            wx.hideLoading();
            this.isshow=true;
            this.bookInfo=detail.data;
            wx.setNavigationBarTitle({
              title: this.bookInfo.title
            })
            console.log(detail);
            
            },
            //获取手机型号
            getPhone(e){
                if (e.target.value) {
                    const phoneInfo=wx.getSystemInfoSync();
                    console.log(phoneInfo);
                    
                    this.phone=phoneInfo.model
                }else{
                    this.phone=""
                }  
            },
            //获取地理位置
            //百度地图ak：2lvaxXlwBLF5pfQY09p3l6AL5za38jud
            //http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
            getLoc(e){
                if (e.target.value) {
                    wx.getLocation({
                        type:'wgs84',
                        success:res=>{
                            console.log(res);
                            let latitude = res.latitude
                            let longitude = res.longitude
                            wx.request({
                                url: 'http://api.map.baidu.com/geocoder/v2/',
                                data: {
                                    location:`${latitude},${longitude}`,
                                    output:'json',
                                    ak:'2lvaxXlwBLF5pfQY09p3l6AL5za38jud'
                                },
                                method: 'GET', 
                                success: res=>{
                                   console.log(res);
                                   this.location=res.data.result.addressComponent.city
                                },
                            })

                            
                        }
                    })
                }else{
                    this.location=''
                }

            },
            //添加评论
            async addComment(){
              //参数
              if (this.comment=="") {
                showModal('提示','请填写评论内容')
                return ;
              }
              let params={
                bookId:this.bookId,
                comment:this.comment,
                openId:wx.getStorageSync('userInfo').openId,
                location:this.location,
                phone:this.phone
              }
              // console.log(params);
              
              const res=await post('/weapp/addcomment',params);
              if (res.code==0) {
                showModal('添加评论',res.data.msg)
                this.getComments();
                
              }else if(res.code==-2){
                showModal('添加失败',res.data.msg)
               
              }
              this.comment=''; //清空评论框的内容
            },
            //获取评论
            async getComments(){
              const res =await get('/weapp/commentlist',{bookId:this.bookId});
              this.comments=res.data.list
              console.log(res.data.list);
              
            },
            //获取当前登录用户信息
            getUserInfo(){
                this.userInfo=wx.getStorageSync('userInfo');
                console.log(this.userInfo);
                
            }
        },
        components:{
            Rate,
            CommentList
        }
    }
</script>

<style lang="scss">
    .book-detail{
        .row{
            padding:0 20rpx 0 20rpx;
            display: flex;
            justify-content: space-between;
            margin-top: 15rpx;
            .left{
                font-size: 32rpx;
                display: flex;
                align-items: center;
                img{
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 50%;
                }
                .nickName{margin-left: 15rpx;}
            }
            .right{
                display: flex;
                font-size: 32rpx;
                align-items: center;
                color:#EA5149;
            }
        }
        .tags{
            margin-top: 30rpx;
            padding: 0 20rpx 0 20rpx;
            .tag{
                display: inline-block;
                font-size: 28rpx;
                padding: 10rpx 8rpx 10rpx 8rpx;
                color:#EA5149;
                border: 2rpx solid #EA5149;
                border-radius: 20rpx;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
            }
        }
        .summary-container{
            padding: 0 20rpx 0 20rpx;
            h1{font-size:38rpx;margin-bottom: 20rpx;}
            p{
                font-size: 28rpx;
                text-indent: 56rpx;
            }
        }
        .comment{
            padding: 10rpx;
            .comment-textarea{
                background: #eeeeee;
                width: 730rpx;
                height: 200rpx;
            }
        }
        .phone{
            font-size: 32rpx;
            span{
                color:brown;
            }

        }
        .location{font-size:32rpx;margin-top: 20rpx;span{ color:brown;} }
        .btn{
          background:#EA5149;
          color:white;
          border-radius: 20rpx;
          margin-top: 30rpx;
        }
        .btn:active{
          background:brown;
        }
        .footer-text{text-align: center;font-size: 28rpx;padding: 10rpx 0 10rpx 0;color:cadetblue;}
    }
    .img-container{
        position: relative;
        justify-content: center;
        overflow: hidden;
        }
    .img-container .info-container{
        width: 250rpx;
        height: 500rpx;
        position:absolute;
        top:20rpx;
        left: 242rpx;
        font-size: 32rpx;
        color: white;
        text-align: center;
        }
    .info-container img{width: 100%;height: 335rpx;}
    .img-container .back{
        height: 500rpx;
        width: 100%;
        filter: blur(20px)
    }
    .img-container  .back img{
        width: 100%;
    }
</style>