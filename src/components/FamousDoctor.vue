<template>
  <div class="FamousDoctor">
    <SearchBar ref="child" :placeholder="searchbar.placeholder" :leftIcon="searchbar.leftIcon" :rightIcon="searchbar.rightIcon" :leftPath="searchbar.leftPath" @search="search"></SearchBar>

    <div class="topBar">
      <div class="" @click="show">
        <span>全部地区</span>
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </div>
      <div class="">
        <span>排序</span>
        <i class="fa fa-sort" aria-hidden="true"></i>
      </div>
      <div class="">
        <span>科室</span>
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </div>
    </div>
    <transition name='fade'>
      <Region v-show="isShow" class="region"></Region>
    </transition>

    <transition name='fade'>
      <ul class="list" v-show="isShowList">
        <li v-for="item in list">{{item.user.nickName}}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
import SearchBar from '@/components/commons/SearchBar'
import Region from '@/components/commons/Region'
export default {
  data(){
    return {
      searchbar:{
        placeholder:"请输入要查找的名医",
        leftIcon:`<i v-show="isShow" class="fa fa-angle-left" aria-hidden="true"></i>`,
        rightIcon:``,
        leftPath:"/Index"
      },
      isShow:false,
      isShowList:false,
      list:""
    }
  },
  components:{
    SearchBar,
    Region
  },
  activated(){
    this.$store.commit("changeaAppMarginBooleans");
  },
  deactivated(){
    this.$store.commit("changeaAppMarginBooleans");
  },
  watch:{
    $route (to, from) {
      const toPath = to.path.split('/')[1];
      if(toPath!='FamousDoctor'){
        this.isShow=false;
      }
    }
  },
  updated(){
    this.$indicator.close();
  },
  beforeCreate(){
    this.$indicator.open();
    this.$axios({
      method:'post',
      url:'/dsjk/api/expert/expertList',
      data:{
        index:1
      }
    }).then((res)=>{
      this.list=res.data.data
      this.isShowList=true;
    })
  },
  methods:{
    search(){
      alert("搜索")
    },
    show(){
      this.isShow=!this.isShow;
    }
  }
}
</script>

<style scoped="true">
.topBar{
  width: 100%;
  position: fixed;
  left: 0;
  top: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background: #fff;
}
.topBar>div{
  flex: 1;
  height: 40px;
  border-bottom: 1px solid #eee;
  line-height: 40px;
  border-right: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}
.topBar>div i{
  margin-left: 10px;
  font-size: 14px;
}
.topBar>div:nth-child(3n){
  border-right: none;
}
.list{
  margin-top: 87px;
}
</style>
