<template>
  <div class="Login">
    <Header :title="title" :path="path" :isShow="isShow" :rightIcon="rightIcon" :pathRight="pathRight"></Header>

    <div class="loginForm">
      <div class="formItem" :class="{active:focusIndex==1}">
        <label for="phone">
          <i class="fa fa-mobile" aria-hidden="true"></i>
        </label>
        <input @focus="focus" @blur="blur" index=1 id="phone" type="tel" v-model="phone" value="" placeholder="请输入手机号">
      </div>
      <div class="formItem" :class="{active:focusIndex==2}">
        <label for="pass">
          <i class="fa fa-lock" aria-hidden="true"></i>
        </label>
        <input @focus="focus" @blur="blur" index=2 id="pass" type="password" v-model=pass value="" placeholder="请输入密码">
      </div>

      <input @click="login" id="btn" class="background" type="button" name="" value="登录">

      <span class="other">第三方账号登录</span>

      <div class="wxlog" @click=wxLogin>
        <img src="../assets/images/wxlog.png" alt="">
      </div>

    </div>

  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      title:"请登陆",
      path:"/Index",
      isShow:true,
      rightIcon:"注册",
      pathRight:"/RegType",
      focusIndex:"",
      phone:"",
      pass:""
    }
  },
  components:{
    Header
  },
  mounted(){
  },
  methods:{
    focus(e){
      this.focusIndex=e.target.attributes.index.value;
    },
    blur(){
      this.focusIndex="";
    },
    wxLogin(){
      //测试环境
      let APPID="wx32f14809226f0534"
      let REDIRECT_URI="http://dsjk.s3.natapp.cc/dsjk/api/userLogin/wxLogin.do?data=tzUrl:/wx/My"

      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+REDIRECT_URI+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    },
    login(){
      if(this.phone==""){
        this.$toast("请输入手机号")
        return false;
      }else if(this.pass==""){
        this.$toast("请输入密码")
        return false;
      }else{
        this.$indicator.open();
        setTimeout(()=>{
          this.$indicator.close();
        },10000)
        this.$axios({
          method:'post',
          url:"/dsjk/api/userLogin/passwordLogin.do",
          data:{
            cellphone:this.phone,
            password:this.pass,
            loginType:0
          }
        }).then((res)=>{
          this.$indicator.close();
          if(res.data.code==200){
            this.$toast(res.data.message);
            sessionStorage.token=res.data.data.token;
            setTimeout(()=>{
              this.$router.push({path:"/My"});
            },1000)
          }else{
            this.$toast(res.data.message);
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.loginForm{
  width: 80%;
  margin:30vh auto;
}
.formItem{
  height: 38px;
  border:1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
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
.other{
  margin:30px 0 15px;
  color: #888;
  line-height: 12px;
}
.wxlog{
  width: 40px;
  height: 40px;
  padding:3px;
  border:1px solid #86c610;
  border-radius: 24px;
  margin:0 auto;
}
</style>
