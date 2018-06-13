<template>
  <div class="RegType">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>

    <div class="typeWrap">
      <ul>
        <li>
          <div class="">
            <div class="personInfo">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              <span>我是患者</span>
            </div>
            <span class="msg">看病找医生请选择此项</span>
          </div>
          <router-link to="/RegPatient" class="regBtn background">普通注册</router-link>
        </li>
        <li>
          <div class="">
            <div class="personInfo">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              <span>我是医生</span>
            </div>
            <span class="msg">医生请选择此项</span>
          </div>
          <router-link to="RegDoctor" class="regBtn background">医生注册</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/components/commons/Header'
export default {
  data () {
    return {
      title:"请选择注册类型",
      path:"/Login",
      isShow:true,
      pathRight:""
    }
  },
  components:{
    Header
  },
  mounted(){

  }
}
</script>

<style scoped>
.typeWrap{
  margin-top: 76px;

}
.typeWrap ul li{
  width: 95%;
  margin:0 auto 20px;
  height: 35vh;
  box-shadow: 1px 1px 5px #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.personInfo{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin-bottom: 10px;
  color: #26a2ff;
}
.personInfo i{
  font-size: 28px;
  margin-right: 10px;
}
.personInfo span{
  font-size: 16px;
}
.msg{
  color: #5cb85c;
  font-weight: bold;
}
.regBtn{
  width: 100px;
  height: 34px;
  margin:0 auto;
  line-height: 34px;
  color: #fff;
  border-radius: 5px;
}
</style>
