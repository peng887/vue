<template>
  <div class="store">
    <Header :title="title" :path="path" :isShow="isShow" :pathRight="pathRight"></Header>

    <!-- <div class="topBar">
      <router-link to="#">
        <span>商城积分：</span>
        <span class="red">100</span>
      </router-link>
      <router-link to="#">
        <span>收支明细</span>
      </router-link>
      <router-link to="#">
        <span>赚取积分</span>
      </router-link>
    </div> -->
    <transition name="fade">
      <div class="" v-show="isShowList">
        <ul class="category">
          <li ref='lis' :class='{active:index===active}' @click="checkUpdata(index,item)" v-for="(item,index) in category">{{item.T_NAME}}</li>
        </ul>

        <ul class="list">
          <li v-for="item in list">
            <router-link :to="{
              path:'/GoodDetail',
              query:{id:item.SHANGPIN_ID}
            }">
              <img :src="item.SHANGPIN_PHOTO" alt="">
              <div class="goodText">
                <span class="title line-two">{{item.SHANGPIN_BIAOTI}}</span>
                <div class="priceWrap">
                  <span class="red">￥80</span>
                  <span class="score">69积分</span>
                </div>
              </div>
            </router-link>
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
      title:"商城",
      path:"",
      isShow:false,
      pathRight:"",
      category:"",
      active:0,
      list:"",
      flag:true,
      isShowList:false
    }
  },
  beforeCreate(){
    this.$indicator.open();
  },
  updated(){
    this.$indicator.close();
    if(this.flag){
      this.$refs.lis[0].click();
      this.flag=false;
    }
  },
  components:{
    Header
  },
  mounted(){
    this.$axios({
      method:"post",
      url:'/FHADMINM/api/commoditytype/SelectList.do',
      data:{}
    }).then((res)=>{
      this.category=res.data.data;
    })
  },
  methods:{
    checkUpdata(index,item){
      this.active=index;
      this.$axios({
        method:'post',
        url:'/FHADMINM/api/shangpin/drugSearchByType.do',
        data:{
          typeId:item.COMMODITYTYPE_ID,
          pageIndex:1
        }
      }).then((res)=>{
        this.list=res.data.data;
        this.isShowList=true;
      })
    }
  }
}
</script>

<style scoped>
  /* .topBar{
    margin-top: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:15px 0;
    border-bottom: 1px solid #eee;
  }
  .topBar a{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #26a2ff;
  } */
  .category{
    margin-top: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .category li{
    flex: 1;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #eee;
    font-weight: bold;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: #f1f1f1;
  }
  .list li{
    width: 45%;
    margin:0 2% 2% 0;
    background: #fff;
    padding:2%;
  }
  .list li:nth-child(2n){
    margin-right: 0;
  }
  .goodText{
    padding-top: 10px;
  }
  .goodText .title{
    text-align: left;
    line-height: 20px;
    height: 40px;
    margin-bottom: 10px;
  }
  .priceWrap{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .score{
    color: #26a2ff;
  }
  .active{
    color: #26a2ff;
    border-bottom: 2px solid #26a2ff!important;
    font-weight: bold;
  }
</style>
