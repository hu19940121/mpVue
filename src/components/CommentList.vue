<template>
    <div class="comments-list">
        <div class="comments-list-title">
           评论
        </div>
        <div class="comment-container">
            <div class="comment" v-for="(comment,index) in comments" :key="index">
                <div class="header">
                    <div class="left">
                        <img :src="comment.user_info.avatarUrl" alt="">
                        <span>{{comment.user_info.nickName}}</span>                      
                    </div>
                    <div class="right">
                        <span class="location">
                            {{comment.location  || '未知城市'}}
                        </span>
                       --
                        <span class="phone">
                            {{comment.phone  || '未知型号'}}
                        </span>
                    </div>
                 
                   
                </div>
                <p class="comment-text">
                    {{comment.comment}}
                </p>
                 <div class="line"></div>
            </div>
           
        </div>
    
    </div>
</template>

<script>
    export default {
      props:['comments'],
      data(){
          return {
              comments:[]
          }
      },
      created(){
          
          
      }
    }
</script>

<style lang="scss">
    .comments-list{
        .comments-list-title{
            padding-left: 20rpx;
            margin-bottom: 20rpx; 
            background-color: #eeeeee;
            height: 78rpx;
            line-height: 78rpx;
        }
        .comment-container{
          
            .comment{
                padding-top: 20rpx;
                .header {
                    padding: 0 20rpx 0 20rpx;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .left {
                        font-size: 32rpx;
                        display: flex;
                        align-items: center;
                        img {
                            width: 60rpx;
                            height: 60rpx;
                            border-radius: 50%;
                        }
                        span {
                            margin-left: 15rpx;
                        }
                    }
                    .right {
                        font-size: 28rpx;
                    }
                }

                .comment-text {
                    margin-top: 18rpx;
                    font-size: 32rpx;
                    padding: 20rpx;
                }
            }

        }
        .line{
            width: 100%;
            height: 10rpx;
            background-color: #eeeeee;
        }
    }
</style>