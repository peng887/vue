<template>
  <div class="InformationDetail">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>
      <h3 ref='title'>{{data.title}}</h3>
      <p ref='content'>{{data.content}}</p>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      title:"资讯详情",
      path:"/InformationList",
      isShow:true,
      pathRight:"",
      data:""
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
    this.$axios({
      method:"post",
      url:"/dsjk/api/dsInformation/detail.do",
      data:{
        id:this.$route.query.id
      }
    }).then(res=>{
      if(res.data.code==200){
        this.data=res.data.data;
      }
    })
  }
}
</script>

<style scoped>
h3{
  margin-top: 46px;
  padding:15px 0 5px 0;
  font-size: 16px;
}
p{
  font-size: 14px!important;
  line-height: 26px!important;
  padding:10px;
  text-indent: 2rem;
}
</style>
