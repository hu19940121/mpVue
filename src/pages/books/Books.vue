<template>
    <div class="books">
      <Lunbo :imageInfo='imageInfo' />
      <Card   v-for="book in books" :key="book.id" :book='book'>
      </Card>
    </div>
</template>

<script>
import config from "../../config";
import {get} from '@/untils'
import Card from '@/components/Card'
import Lunbo from '@/components/Lunbo'

import { showSuccess,showFail ,showLoading,showModal} from "../../untils";
import qcloud from "wafer2-client-sdk";
  export default {
      data(){
        return{
            books:[],
            nomore:false,
            imageInfo:[]
        }
      },
      mounted(){
          this.getList(true)
          this.getTop();
      },
      methods:{
        async getList(init){
            if (init) {
              this.page=0;
              this.nomore=false;
            }
            showLoading()
            const books=await get('/weapp/booklist',{page:this.page})
            //page若为0 则加载前十条 若不为0 则累加
            if (this.page>0) {
              //判断是否到达底部
              if (books.data.list.length==0) {
                this.nomore=true;
              }
              this.books=this.books.concat(books.data.list)
            }else{
              this.books=books.data.list; 
            }
           wx.stopPullDownRefresh()
           wx.hideLoading()

        },
        async getTop(){
          const imgInfo=await get('/weapp/top');
          this.imageInfo=imgInfo.data.data
          console.log( imgInfo.data.data);
          
        }
      },
      onPullDownRefresh(){
        this.getList(true)
        
      },
      onReachBottom(){
        this.page=this.page+1
        this.getList()
        if (this.nomore) {
          showModal('提示','已经到达底部')
        }
        
      },
      components:{
        Card,
        Lunbo
      }
      
  }
</script>

<style scoped>
   

</style>