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
      <div class="" @click="showDepartment">
        <span>科室</span>
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </div>
    </div>
    <transition name='fade'>
      <Region v-show="isShow" class="region"></Region>
    </transition>

    <transition name='fade'>
      <Department v-show="isShowDepartment" class="region"></Department>
    </transition>

    <transition name='fade'>
      <ul class="list" v-show="isShowList">
        <li v-for="item in list">
          <img class="photo" :src="item.user.photo" alt="">
          <div class="right">
            <div class="top">
              <div class="topL">
                <span class="name">{{item.user.nickName}}</span>
                <span>主任医师</span>
              </div>
              <div class="topR"></div>
            </div>
            <div class="mid">
              <span>问诊量：328</span>
              <span>泌尿外科</span>
            </div>
            <div class="bot line-two">擅长：书法家武器发射地点附近我去额欸u是你的埃克设计的佛i请问九分可就是覅哦亲哦万福金安伺服电机</div>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import SearchBar from '@/components/commons/SearchBar'
import Region from '@/components/commons/Region'
import Department from '@/components/commons/Department'
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
      isShowDepartment:false,
      list:""
    }
  },
  components:{
    SearchBar,
    Region,
    Department
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
      if(this.isShow){
        this.isShowDepartment=false
      }
    },
    showDepartment(){
      this.isShowDepartment=!this.isShowDepartment;
      if(this.isShowDepartment){
        this.isShow=false
      }
    }
  }
}
</script>

<style scoped="true">
.mid,.topL{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.mid span{
  margin-right: 20px;
}
.name{
  font-weight: bold;
  font-size: 14px;
  margin-right: 20px;
}
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
  padding:0 10px;
}
.list li{
  display: flex;
  justify-content: center;
  align-items: center;
  padding:15px 0;
  border-bottom: 1px solid #eee;
}
.list li .photo{
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 20px;
}
.list li .right{
  flex: 1;
}
.right{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right>div{
  margin-bottom:10px;
}
.bot{
  line-height: 20px;
}
</style>
