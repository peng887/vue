<template>
  <div class="RegDoctor">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>
    <p>RegDoctor</p>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      title:"医生注册",
      path:"/RegType",
      isShow:true,
      pathRight:""
    }
  },
  components:{
    Header
  },
  mounted(){
    this.$toast("未开发")
  }
}
</script>

<style scoped>
p{
  margin-top: 46px;
}
</style>
