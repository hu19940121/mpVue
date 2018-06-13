<template>
    <div class="yearProgress">
        <progress :percent='percent' color="#EA5149" />
        <p>{{year}}已经过去了{{days}}天 {{percent}}%</p>
    </div>
</template>

<script>
    export default {
        data(){},
        methods:{

        },
        computed:{
            //年
            year(){
                return new Date().getFullYear();
            },
            //一年过去的天数
            days(){
                let start=new Date();
                start.setMonth(0);
                start.setDate(1);
                //start是今年的第一天
                //今天的时间戳 减去今年第一天的时间戳
                let offset =new Date().getTime()-start.getTime();
                return parseInt(offset/1000/60/60/24)+1
            },
            //百分比
            percent(){
                return parseInt((this.days/365)*100)
            }

        },

    }
</script>

<style scoped>
    .yearProgress{
        margin-top: 20rpx;
        width: 100%;
        text-align: center;
    }
    .yearProgress p{
        margin-top: 40rpx;
    }
</style>