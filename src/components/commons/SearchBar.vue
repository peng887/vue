<template>
  <div class="search background">
    <div class="comment">
      <router-link :to="leftPath" v-html="leftIcon">

      </router-link>
    </div>
    <div class="inputWrap">
      <i class="fa fa-search" aria-hidden="true"></i>
      <input id="search" type="text" name="" value="" :placeholder="placeholder" @keyup="keyUp" @focus="focus">
    </div>
    <span class="comment">
      <router-link to="" v-html="rightIcon">

      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props:{
    placeholder:"",
    leftIcon:"",
    rightIcon:"",
    leftPath:""
  },
  methods:{
    keyUp(){
      this.$emit('search');
    },
    focus(){
      this.$emit("focus")
    }
  }

}
</script>

<style scoped>
.search{
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
}
.mint-searchbar{
  background: #26a2ff;
}
.search .inputWrap{
  flex: 5;
  height: 34px;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
}
.search .inputWrap i{
  font-size: 16px;
  margin-right: 8px;
}
.search #search{
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.search .comment{
  flex: 1;
  font-size: 20px;
}
.search .comment a{
  color: #fff;
}
</style>
