


<script>
import config from "./config";
import { get } from "./untils";
import qcloud from "wafer2-client-sdk";
export default {
  async created() {
    // const res = await get('/weapp/demo');
    // console.log(123,res);
    // qcloud.setLoginUrl(config.loginUrl);
    // qcloud.login({
    //   success: function(userInfo) {
    //     console.log("登录成功", userInfo);
    //   },
    //   fail: function(err) {
    //     console.log("登录失败", err);
    //   }
    // });
  }
};
</script>

<style scoped>
  .defaultColor{
    color: #EA5149;
  }
  .footer-text{
    font-size: 28rpx;
    text-align: center;
    margin-top: 20rpx;
    margin-bottom: 30rpx;
  }
</style>