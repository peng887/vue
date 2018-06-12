<template>
  <div class="header background">
    <router-link :to="path"><i v-show="isShow" class="fa fa-angle-left" aria-hidden="true"></i></router-link>
    <p>{{title}}</p>
    <router-link :to="pathRight" v-html="rightIcon"></router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props:{
    title:"",
    path:"",
    isShow:"",
    rightIcon:"",
    pathRight:""
  }

}
</script>

<style scoped>
  .header{
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 14px;
    position: fixed;
    left: 0;
    top: 0;
  }
  .header a{
    color: #fff;
    width: 46px;
    height: 46px;
    line-height: 46px;
  }
  .header p{
    flex: 1;
  }
  .header a i{
    font-size: 30px;
    line-height: 46px;
  }
</style>
