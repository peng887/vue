<template>
  <div class="GoodDetail">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>
    <div class="goodDetailWrap">
      <div class="goodImg" ref="goodImg">
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/commons/Header'
export default {
  data () {
    return {
      title:"商品详情",
      path:"/Store",
      isShow:true,
      pathRight:""
    }
  },
  components:{
    Header
  },
  beforeCreate(){
    this.$indicator.open();
  },
  updated(){
    this.$indicator.close();
  },
  mounted(){
    let width=this.$refs.goodImg.offsetWidth;
    this.$refs.goodImg.style.height=width+'px';
    this.$axios({
      method:'post',
      url:'/FHADMINM/api/shangpin/SelectDetails.do',
      data:{
        shangpin_id:this.$route.query.id
      }
    }).then((res)=>{
      this.$indicator.close();
      if(res.data.code==200){
        this.$toast(res.data.message)
      }else{
        this.$toast(res.data.message)
      }
    }).catch((err)=>{
      this.$indicator.close();
      this.$toast("网络错误")
    })
  }
}
</script>

<style scoped>
.goodDetailWrap{
  margin-top: 46px;
}
</style>
