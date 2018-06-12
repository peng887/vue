<template>
  <div id="app" :class="{appMargin:isTrue}">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="bar"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
    }
  },
  computed:{
    isTrue(){
      return this.$store.state.appMarginBooleans
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
*{
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 12px;
  color: #555;
}
.appMargin{
  margin-bottom: 46px;
}
ul{
  padding:0;
  margin:0;
}
li{
  list-style: none;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
input[type="button"], input[type="submit"], input[type="reset"] {
-webkit-appearance: none;
}
input{
  outline: none;
  border:none;
  -webkit-tap-highlight-color:rgba(255,0,0,0);
}
img{
  width:100%;
  height:100%;
  border:0;
  display: block;
}
a{
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
  color: #555;
  display: block;
}
span{
  display: block;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
.line-one{
  overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:1;
}
.line-two{
  overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.red{
  color: red;
}
.background{
  background:#26a2ff;
}
.positionRel{
  position: relative;
}

</style>
