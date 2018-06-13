<template>
  <div class="RegPatient">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>
    <div class="RegPatientWrap">
      <div class="RegPatientForm">
        <div class="upWrap">
          <label class="upBtn" for="upBtn">
            <img :src="fileUrl" alt="">
          </label>
          <span>上传头像</span>
          <input id="upBtn" ref="upBtn" @change="upBtn" type="file" name="" value="上传">
        </div>

        <div class="formItem" :class="{active:index==1}">
          <label for="phone">
            <i class="fa fa-mobile" aria-hidden="true"></i>
          </label>
          <input @focus="focus" index="1" id="phone" type="tel" v-model="phone" value="" placeholder="请输入手机号">
        </div>

        <div class="formItem" :class="{active:index==2}">
          <label for="code">
            <i class="fa fa-shield" aria-hidden="true"></i>
          </label>
          <input @focus="focus" index="2" id="code" type="tel" v-model="code" value="" placeholder="验证码">
          <span @click="toCode" class="toCode background">获取验证码</span>
        </div>

        <div class="formItem" :class="{active:index==3}">
          <label for="pass">
            <i class="fa fa-lock" aria-hidden="true"></i>
          </label>
          <input @focus="focus" index="3" id="pass" type="password" v-model="pass" value="" placeholder="请输入密码">
        </div>

        <input @click="register" id="btn" class="background" type="button" name="" value="注册">
      </div>




    </div>

  </div>
</template>

<script>
import Header from '@/components/commons/Header'
export default {
  data () {
    return {
      title:"患者注册",
      path:"/RegType",
      isShow:true,
      pathRight:"",
      fileUrl:require('@/assets/images/defaultPhoto.png'),
      phone:"",
      code:"",
      pass:"",
      session:"",
      index:""
    }
  },
  components:{
    Header
  },
  mounted(){

  },
  methods:{
    focus(e){
      this.index=e.target.attributes.index.value;
    },
    upBtn(){
      this.$indicator.open();
      this.$Global.upFile(this.$refs.upBtn,this);
    },
    toCode(){
      if(this.phone==""){
        this.$toast("请输入手机号")
      }else{
        this.$indicator.open();
        this.$axios({
          method:'post',
          url:'/dsjk/api/user/sendCode.do',
          data:{
            cellPhone:this.phone
          }
        }).then((res)=>{
          this.$indicator.close();
          if(res.data.code==200){
            this.$toast(res.data.message)
            this.session=res.data.data;
          }else{
            this.$toast(res.data.message)
          }
        })
      }

    },
    register(){
      if(this.phone==""){
        this.$toast("请输入手机号")
      }else if(this.code==""){
        this.$toast("请输入验证码")
      }else if(this.pass==""){
        this.$toast("请输入密码")
      }else if(this.fileUrl==require('@/assets/images/defaultPhoto.png')){
        this.$toast("请上传头像")
      }else{
        this.$indicator.open();
        this.$axios({
          method:"post",
          url:"/dsjk/api/user/verifyCode.do",
          data:{
            code:this.code,
            sessionId:this.session
          }
        }).then((res)=>{
          if(res.data.code==200){
            this.$axios({
              method:"post",
              url:"/dsjk/api/user/reister.do",
              data:{
                photo:this.fileUrl,
                cellphone:this.phone,
                password:this.pass,
                userType:1
              }
            }).then((res)=>{
              this.$indicator.close();
              this.$toast(res.data.message)
              setTimeout(()=>{
                this.$router.push({path: '/Login'});
              },1000)
            })
          }else{
            this.$indicator.close();
            this.$toast(res.data.message)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.RegPatientWrap{
  margin-top: 76px;
}
#upBtn{
  display: none;
}
.upWrap{
  margin-bottom: 30px;
}
.upBtn{
  width: 80px;
  height: 80px;
  border-radius: 40px;
  display: block;
  margin:0 auto 10px;
  overflow: hidden;
}
.RegPatientForm{
  width: 80%;
  margin:0 auto;
}
.formItem{
  height: 38px;
  border:1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.formItem label{
  width: 40px;
  font-size: 22px;
}
.formItem label i{
  line-height: 38px;
  height: 38px;
}
.formItem input{
  flex: 1;
  font-size: 14px;
  line-height: 18px;
  width: 100%;
}
.toCode{
  line-height: 38px;
  color: #fff;
  white-space: nowrap;
  padding:0 10px;
}
#btn{
  height: 40px;
  width: 100%;
  margin:10px auto 0;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
}
.active{
  color: #26a2ff;
  border-color: #26a2ff;
}
</style>
