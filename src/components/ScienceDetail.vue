<template>
  <div class="ScienceDetail">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>
    <transition name="fade">
    <div class="detail" v-show="isLoad">
      <p class="title line-two">{{detailTitle}}</p>
      <div class="tags">
        <span>{{CLICK_NUM}}</span>
        <span>{{LIKE_NUM}}</span>
        <span>{{CREATE_TIME}}</span>
      </div>

      <div :class="{active:isActive}" ref="content" v-html="CONTENT"></div>
    </div>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/commons/Header';
export default {
  data () {
    return {
      title:"看科普",
      path:'/Index',
      pathRight:"",
      detailTitle:"",
      CLICK_NUM:"",
      LIKE_NUM:"",
      CREATE_TIME:"",
      TITLE_PAGE_PIC_PATH:"",
      CONTENT:"",
      isActive:true,
      isShow:true,
      isLoad:false
    }
  },
  components:{
    Header
  },
  beforeCreate(){
    this.$indicator.open();
    this.$axios({//MENU
      method:'post',
      url:"/FHADMINM/api/mt/kepu/getArticleDetail.do",
      data:{
        article_id:this.$route.query.id,
        user_id:""
      }
    }).then(res=>{
      this.isLoad=true;
      this.detailTitle=res.data.data.TITLE;
      this.CLICK_NUM="阅读 "+res.data.data.CLICK_NUM;
      this.LIKE_NUM="点赞 "+res.data.data.LIKE_NUM;
      this.CREATE_TIME=res.data.data.CREATE_TIME.split(" ")[0];
      this.TITLE_PAGE_PIC_PATH=res.data.data.TITLE_PAGE_PIC_PATH;
      this.CONTENT=res.data.data.CONTENT;
    })
  },
  updated(){
    this.$indicator.close();
    var oP=this.$refs.content.getElementsByTagName('p');
    for(var i=0;i<oP.length;i++){
      oP[i].style.marginBottom="10px";
      oP[i].style.fontSize="14px";
      oP[i].style.lineHeight="22px";
    }
    var oH=this.$refs.content.getElementsByTagName('h2');
    for(var i=0;i<oH.length;i++){
      oH[i].style.marginBottom="10px";
      oH[i].style.fontSize="16px";
      oH[i].style.lineHeight="24px";
    }
    var oDiv=this.$refs.content.getElementsByTagName('div');
    for(var i=0;i<oDiv.length;i++){
      oDiv[i].style.marginBottom="10px";
      oDiv[i].style.fontSize="14px";
      oDiv[i].style.lineHeight="24px";
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
  .ScienceDetail{
    padding-top: 60px;
  }
  .detail{
    padding:0 10px;
  }
  .title{
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    line-height: 26px;
    margin-bottom: 20px;
  }
  .tags{
    display: flex;
    justify-content:space-between;
    color: #999;
    margin-bottom: 10px;
  }
  .active{
    text-align: left;
  }
</style>
