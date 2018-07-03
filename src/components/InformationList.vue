<template>
  <div class="InformationList">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>
    <transition name='fade'>
      <ul class="InformationWrap" v-show="isLoad">
        <li v-for="item in list">
          <router-link :to="{path:'/InformationDetail',query:{id:item.INFORMATION_ID}}">
            <p class="line-one title">{{item.TITLE}}</p>
            <p class="line-two subTitle">{{item.CONTENT}}</p>
            <span class="time">{{item.CREATE_TIME}}</span>
          </router-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/commons/Header'
export default {
  data () {
    return {
      title:"得上资讯",
      path:"/Index",
      isShow:true,
      pathRight:"",
      list:[],
      page:"1",
      isLoad:false,
      flag:""
    }
  },
  components:{
    Header
  },
  beforeCreate(){
    this.$indicator.open();
  },
  updated(){
    this.$indicator.close();
  },
  mounted(){
    this.update()
    window.addEventListener('scroll', this.handleScroll);
  },
  watch:{
    $route (to, from) {
      const toPath = to.path.split('/')[1];
      if(toPath!='InformationList'){
        window.removeEventListener('scroll', this.handleScroll);
      }else{
        window.addEventListener('scroll', this.handleScroll);
      }
    }
  },
  methods:{
    update(){
      this.flag=false;
      this.$axios({
        method:"post",
        url:"/FHADMINM/api/dsInformation/getInformationList",
        data:{
          pageIndex:this.page
        }
      }).then((res)=>{
        if(!res.data.data){
          this.$toast("没有更多了")
        }else{
          this.isLoad=true;
          this.page++;
          this.flag=true;
          for(var i=0;i<res.data.data.length;i++){
            this.list.push(res.data.data[i])
          }
        }
      })
    },
    handleScroll(){
      let pageHeight = document.body.clientHeight+110;//文档height
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动距离
      let winHeight = document.documentElement.clientHeight;//可视区height
      let addHeight=scrollTop+winHeight;
      if(pageHeight-addHeight<=500&&this.flag==true){
          this.update()
      }
    }
  }
}
</script>

<style scoped>
.InformationWrap{
  margin-top: 46px;
}
.InformationWrap li{
  border-bottom: 1px solid #eee;
  padding:10px;
}
.title{
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
}
.subTitle{
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 22px;
}
.time{
  text-align: right;
  color: #999;
}
</style>
