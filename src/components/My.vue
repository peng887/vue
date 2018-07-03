<template>
  <div class="my">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>
    <transition name="fade">
      <div v-show="isLoad">
      <div class="mySelf">
        <div class="myWrap">
          <img :src="userInfo.USER_PHOTO" alt="">
          <div class="text">
            <span class="name">{{userInfo.USER_NICKNAME}}</span>
            <span>{{userInfo.USER_CELLPHONE}}</span>
          </div>
        </div>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </div>

      <ul class="my-one">
        <li v-for="item in group.GROUP1">
          <img :src="item.M_PHOTO" alt="">
          <span>{{item.M_NAME}}</span>
        </li>
      </ul>

      <div class="">
        <p class="title">常用功能</p>
        <ul class="my-two">
          <li :style="style" ref="twoLi" v-for="item in group.GROUP2">
            <img :src="item.M_PHOTO" alt="">
            <span>{{item.M_NAME}}</span>
          </li>
        </ul>
      </div>

      <ul class="my-three">
        <li v-for="item in group.GROUP3">
          <img :src="item.M_PHOTO" alt="">
          <span>{{item.M_NAME}}</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </li>
      </ul>

      <ul class="my-three">
        <li v-for="item in group.GROUP4">
          <img :src="item.M_PHOTO" alt="">
          <span>{{item.M_NAME}}</span>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </li>
      </ul>
    </div>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/commons/Header'
export default {
  data () {
    return {
      isLoad:false,
      title:"个人中心",
      path:"",
      isShow:false,
      pathRight:"",
      group:"",
      style:{
        height:""
      },
      userInfo:"",
      userType:""
    }
  },
  components:{
    Header
  },
  updated(){
    this.$indicator.close();
  },
  methods:{
  },
  activated(){
    this.$axios({
      method:"post",
      url:"/FHADMINM/api/Users/selectUser.do",
      data:{
        TOKEN:encodeURIComponent(sessionStorage.token)
      }
    }).then((res)=>{
      if(res.data.code==200){
        this.userInfo=res.data.data;
        this.userType = this.userInfo.USER_TYPE
        this.detail(this.userType);
      }else{
        this.$indicator.close();
        this.$router.push({path:"/Login"})
      }
    })
  },
  beforeCreate(){
    this.$indicator.open();
  },
  mounted(){
  },
  methods:{
    detail(userType){
      this.$axios({
        method:'post',
        url:'/FHADMINM/api/userModule/getmodule.do',
        data:{
          M_USER_TYPE:userType
        }
      }).then((res) => {
        if(res.data.code==200){
          this.isLoad = true
          this.group = res.data.data;
        }
      })
    }
  }
}
</script>

<style scoped>
.my{
  background: #f2f2f2;
}
.mySelf{
  margin-top: 46px;
  background: #fff;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:20px 0;
}
.mySelf .myWrap{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.mySelf img{
  width: 70px;
  height: 70px;
  border-radius: 40px;
  margin:0 10px;
}
.mySelf i{
  padding: 20px;
  font-size: 26px
}
.text{
  font-size: 14px;
  text-align: left;
}
.name{
  font-weight: bold;
  margin-bottom: 8px;
}
.title{
  text-align: left;
  font-size: 12px;
  line-height: 44px;
  padding-left: 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: #fff;
}
.my-one{
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding:10px 0;
  margin-bottom: 5px;
}
.my-one li{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.my-one li img{
  width: 28px;
  height: 28px;
  margin-right: 10px;
}
.my-two{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin:0 auto 5px;
  background: #fff;
  padding:10px 0;
}
.my-two li{
  width: 25%;
  padding:10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.my-two li:nth-child(4n){
  border-right: none;
}
.my-two li img{
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
}
.my-three{
  border-top: 1px solid #eee;
  background: #fff;
  margin-bottom: 5px;
}
.my-three li{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  border-bottom: 1px solid #eee;
}
.my-three li img{
  width: 22px;
  height: 22px;
  padding:0 15px;
}
.my-three li span{
  flex: 1;
  text-align: left;
}
.my-three li i{
  width: 50px;
  font-size: 16px;
  line-height: 46px;
}
</style>
