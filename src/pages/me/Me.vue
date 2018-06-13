<template>
    <div class="container">
        <div class="userInfo">
          <img :src="userInfo.avatarUrl"  alt="">
          <div v-if="userInfo.nickName!==''" >
            <p>{{userInfo.nickName}}</p>
          </div>
          <div v-else>
            <button class="setBtn" open-type="getUserInfo" lang="zh_CN"  bindgetuserinfo="OnGetUserInfo">点击登录</button>
          </div>
        </div>
        <YearProgress></YearProgress>
        <button @click="scanBook" class="btn" :disabled='btnDdisabled' >添加图书</button>
    </div>
</template>

<script>
import config from "../../config";
import { get, showSuccess, showFail,post,showModal } from "../../untils";
import qcloud from "wafer2-client-sdk";
import YearProgress from "../../components/YearProgress";
export default {
  data() {
    return {
      userInfo: {
        avatarUrl: "../../static/img/unlogin.png",
        nickName: ""
      },
      btnDdisabled:true
    };
  },


  mounted(){
    const userInfo=wx.getStorageSync("userInfo");
    //判断是否已经登录
    if (userInfo) {
      this.userInfo=userInfo ,
      this.btnDdisabled=false;
    }
  
  },
  methods: {
    //添加书
    async addBook(isbn){
      const res=await post('/weapp/addbook',{
        isbn,
        openid:this.userInfo.openId
      })
      if (res.code==0 && res.data.title) {
        console.log(res)
        showModal('添加成功',`${res.data.title}添加成功`)
      }else{
        console.log('失败',res)
      }
    },
      //扫描
    scanBook() {
      wx.scanCode({
        success: res => {
          console.log(res);
          if (res.result) {
            this.addBook(res.result)
          }
        }
      });
    }

  },
  OnGetUserInfo() {
    qcloud.setLoginUrl(config.loginUrl);
    wx.showLoading({ title: "登录中" });
    var _that = this;
    qcloud.login({
      success: function(userInfo) {
        console.log("登录成功", userInfo);
        console.log(userInfo);
        
        _that.userInfo = userInfo;
        _that.btnDdisabled=false;
        wx.setStorageSync("userInfo", userInfo); //存储在本地缓存
        wx.hideLoading();
        showSuccess("登录成功");
      },
      fail: function(err) {
        wx.hideLoading();
        showFail("登录失败");
        console.log("登录失败", err);
      }
    });
  },
  components: {
    YearProgress
  }
};
</script>

<style scoped>

.setBtn {
  width: 40%;
  background: white;
  font-size: 40rpx;
  color: green;
  border: none;
  border-top: 1px solid #eeeeee;
}
.userInfo {
  text-align: center;
  margin-top: 40rpx;
}
.userInfo img {
  width: 300rpx;
  height: 300rpx;
  border-radius: 50%;
}
.btn {
  color: white;
  background-color:#EE2C2C;
  margin-top: 30rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
}
.btn:active {
  background-color:#EE0000	;
}
.container {
  padding: 0 30rpx 0 30rpx;
}
</style>