<template>
  <div class="community">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>
    <p>community</p>
  </div>
</template>

<script>
import Header from '@/components/commons/Header'
export default {
  data () {
    return {
      title:"得上社区",
      path:"",
      isShow:false,
      pathRight:""
    }
  },
  components:{
    Header
  }
}
</script>

<style scoped>
p{
  margin-top: 46px;
}
</style>
