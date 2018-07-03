<template>
  <div class="community">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>

    <div class="top-bar">
      <ul>
        <li>推荐</li>
        <li>关注</li>
        <li v-for="(item,index) in topBarList">{{item.TRIBUNE_TITLE}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/components/commons/Header'
export default {
  data () {
    return {
      title:"得上社区",
      path:"",
      isShow:false,
      pathRight:"",
      topBarList:""
    }
  },
  components:{
    Header
  },
  beforeCreate(){
    this.$axios({
      method:'post',
      url:'/FHADMINM/api/community/tribune/getSyTribune',
      data:{}
    }).then(res=>{
      this.topBarList=res.data.data
    })
  }
}
</script>

<style scoped>
.top-bar{
  margin-top: 46px;
}
.top-bar ul{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid #eee;
  font-weight: bold;
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
}
.top-bar ul::-webkit-scrollbar {display:none}
.top-bar ul li{
  flex: 1;
  height: 40px;
  line-height: 40px;
  padding:0 10px;
  font-size: 14px;
}
</style>
