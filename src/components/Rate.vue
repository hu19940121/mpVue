<template>
    <div class="rate">
        <span class="kong">☆☆☆☆☆</span>
        <div class="hollow" :style='style' >
            ★★★★★
        </div>
        
    </div>
</template>

<script>
    export default {
        props:{
            value:{
                type:[String,Number],
                default:'0'
            }
            
        },
        created(){
            console.log(this.value/2);
            
        },
        computed:{
            style(){
              return `width:${this.value/2}em`
            
            
            }
        }
    }
</script>

<style scoped>
.rate{
    position: relative;
    display: inline-block;
    

}
.hollow{
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 3.9em;
    overflow: hidden;
}
</style>