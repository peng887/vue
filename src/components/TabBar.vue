<template>
  <div class="tabBarWrap">
    <ul class="tabBar">
      <li>
        <router-link to="Index">
          <i class="fa fa-home" aria-hidden="true"></i>
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="Community">
          <i class="fa fa-comments-o" aria-hidden="true"></i>
          <span>社区</span>
        </router-link>
      </li>
      <li>
        <router-link to="" class="positionRel" @click.native="send">
          <i class="fa fa-paper-plane-o sendIcon background" aria-hidden="true"></i>
          <span class="sendTxt">发起众筹</span>
        </router-link>
      </li>
      <li>
        <router-link to="Store">
          <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          <span>商城</span>
        </router-link>
      </li>
      <li>
        <router-link to="My">
          <i class="fa fa-user-circle" aria-hidden="true"></i>
          <span>我的</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data(){
    return {
    }
  },
  methods:{
    send(){
      alert(1)
    }
  }
}
</script>
<style scoped="true">
.tabBar{
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding:6px 0;
  background: #fff;
  z-index: 999;
}
.tabBar li{
  flex: 1;
}
.tabBar li a{
  height: 100%;
}
.tabBar li span{
  line-height: 12px;
  padding-top: 4px;
}
.tabBar li i{
  font-size: 22px;
}
.sendIcon{
  color: #fff;
  padding:8px;
  border-radius: 19px;
  position: absolute;
  top: -20px;
  left: 50%;
  margin-left: -19px;
}
.sendTxt{
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -24px;
  color: #555;
}
.router-link-active{
  color: #26a2ff;
}
</style>
