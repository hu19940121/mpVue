<template>
    <div class="lunbo">
    <swiper indicator-dots="ture" autoplay="true" interval="3000" >
        <swiper-item v-for="(images,index) in imageInfo" :key="index">
            <image @click="goDetail(item.id)" v-for="(item,index2) in images"  :key="index2" :src="item.image" />
        </swiper-item>
  
    </swiper>
    </div>
</template>

<script>
    export default {
        props:['imageInfo'],
        mounted(){
            console.log(this.imageInfo);
            
        },
        methods:{
            goDetail(id){
                wx.navigateTo({
                    url: `/pages/bookdetail/main?id=${id}`,
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
            }
        }
    }
</script>

<style scoped>
.lunbo image{
    width: 33%;
}
</style>