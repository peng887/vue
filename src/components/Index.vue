<template>

    <div class="index">
      <SearchBar :placeholder="searchbar.placeholder" :leftIcon="searchbar.leftIcon" :rightIcon="searchbar.rightIcon" :leftPath="searchbar.leftPath" @focus="focus"></SearchBar>

      <transition name="fade">
        <div class="" v-show="isLoad">
          <div class="swiper-container adSlider">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in group.GROUP1">
                <img :src="item.M_PHOTO" alt="">
              </div>
            </div>
          </div>

          <ul class="menu">
            <li v-for="(item,index) in group.GROUP2" ref="menuLi" @click="menuJump(index)" :url="item.M_NAME_PINYIN">
                <img :src="item.M_PHOTO" alt="">
                <span>{{item.M_NAME}}</span>
            </li>
          </ul>

          <div class="information">
            <span class="title">得上资讯</span>
            <div class="swiper-container informationSlider">
              <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="item in information">
                    <router-link :to="{ path: '/InformationDetail', query:{id:item.INFORMATION_ID} }">{{item.TITLE}}</router-link>
                  </div>
              </div>
            </div>
            <router-link to="/InformationList" class="more"><i class="fa fa-angle-double-right" aria-hidden="true"></i></router-link>
          </div>

          <div class="raise">
              <img :src="raiseImg" alt="">
          </div>

          <ul class="menuTools">
            <li v-for="item in group.GROUP4">
              <img :src="item.M_PHOTO" alt="">
              <span>{{item.M_NAME}}</span>
            </li>
          </ul>

          <div class="titleWrap">
            <span class="title">义诊活动</span>
            <span class="more"><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
          </div>
          <div class="swiper-container freeClinicSlider">
            <div class="swiper-wrapper">
              <div class="swiper-slide freeClinicItem" v-for="item in group.GROUP5">
                <img :src="item.YIZHEN_PHOTO" alt="">
              </div>
            </div>
          </div>

          <div class="titleWrap">
            <span class="title">推荐阅读</span>
            <span class="more"><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
          </div>

          <ul class="list">
            <li v-for="item in list">
              <router-link :to="{
                path:'/ScienceDetail',
                query:{id:item.KEPUARTICLE_ID}
              }">
                <div class="itemImg">
                  <img :src="item.TITLE_PAGE_PIC_PATH" alt="">
                </div>
                <div class="itemText">
                  <div class="textWrap">
                    <p class="line-two">{{item.TITLE}}</p>
                  </div>
                  <div class="tags">
                    <span>浏览&nbsp;{{item.CLICK_NUM}}</span>
                    <span>{{item.CREATE_TIME.split(" ")[0]}}</span>
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
import SearchBar from '@/components/commons/SearchBar'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
export default {
  data () {
    return {
      searchbar:{
        placeholder:"医生/医院/疾病...",
        leftIcon:`<i class="fa fa-camera" aria-hidden="true"></i>`,
        rightIcon:`<i class="fa fa-commenting-o" aria-hidden="true"></i>`,
        leftPath:""
      },
      isLoad:false,
      group:"",
      information:"",
      raiseImg:"",
      list:[],
      page:1,
      flag:"",
    }
  },
  components:{
    SearchBar
  },
  beforeCreate(){
    this.$indicator.open();
  },
  updated(){
    this.$indicator.close();
  },
  mounted(){
    this.$axios({
      method:'post',
      url:"/FHADMINM/api/homeModule/getmodule",
      data:{
        M_USER_TYPE:1
      }
    }).then(res => {
      this.group=res.data.data;
      this.raiseImg = res.data.data.GROUP3[0].M_PHOTO
      this.isLoad = true
      let adSlider = new Swiper('.adSlider', {
      	autoplay: true,
        speed:800,
        loop:true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
      })
      let informationSlider = new Swiper('.informationSlider', {
        direction: 'vertical',
      	autoplay: true,
        speed:800,
        loop:true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
      })
      let freeClinicSlider = new Swiper('.freeClinicSlider', {
      	effect: 'coverflow',
        speed:800,
        autoplay: true,
        loop:true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
      })
    })
    this.$axios({
      method:'post',
      url:"/FHADMINM/api/dsInformation/getInformationList",
      data:{
        pageIndex:1
      }
    }).then(res => {
      if(res.data.code==200){
        this.information = res.data.data
      }
    })

    this.pushData();

    window.addEventListener('scroll', this.handleScroll);

  },
  watch:{
    $route (to, from) {
      const toPath = to.path.split('/')[1];
      if(toPath!='Index'){
        window.removeEventListener('scroll', this.handleScroll);
      }else{
        window.addEventListener('scroll', this.handleScroll);
      }
    }
  },
  methods:{
    focus(){
      console.info("focus")
    },
    pushData(){
      this.flag=false;
      this.$axios({//义诊活动
        method:'post',
        url:"/FHADMINM/api/mt/kepu/getTuijianList",
        data:{
          pageIndex:this.page
        }
      }).then((res)=>{
        this.page++;
        this.flag=true;
        for(var i=0;i<res.data.data.length;i++){
          this.list.push(res.data.data[i]);
        }
      })
    },
    handleScroll(){
      let pageHeight = document.body.clientHeight+110;//文档height
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//滚动距离
      let winHeight = document.documentElement.clientHeight;//可视区height
      let addHeight=scrollTop+winHeight;
      if(pageHeight-addHeight<=500&&this.flag==true){
          this.pushData();
      }
    },
    menuJump(index){
      let url=this.$refs.menuLi[index].attributes.url.value;
      let json={
        wyhz:"Consultation",
        bmyz:"a2",
        myb:"FamousDoctor",
        jmdc:"a4"
      }
      this.$router.push({
        path:json[url]
      })

    }
  }
}
</script>

<style scoped>
.swiper-slide a{
  color: #26a2ff;
}
.adSlider{
  margin-top: 46px;
  height: 33vh;
  margin-bottom: 15px;
}
.menu{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.menu li{
  flex: 1;
}
.menu li img{
  width: 50px;
  height: 50px;
  margin:0 auto;
  margin-bottom: 5px;
}
.menu li span{
  font-size: 12px;
  line-height: 12px;
}
.raise{
  height: 18vh;
  margin-bottom: 15px;
}
.menuTools{
  display: flex;
  flex-wrap: wrap;
}
.menuTools li{
  width: 20%;
  margin-bottom: 20px;
}
.menuTools li img{
  width: 25px;
  height: 25px;
  margin:0 auto;
  margin-bottom: 10px;
}
.menuTools li span{
  font-size: 12px;
  line-height: 12px;
}
.information{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  line-height:46px;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
.information .title{
  width: 20%;
  font-weight: bold;
}
.information .informationSlider{
  width: 65%;
  height: 100%;
  color: #26a2ff;
  text-decoration: underline;
  overflow: hidden;
  white-space:nowrap;
}
.information .more{
  width: 15%;
  font-size: 14px;
  color: #999;
}
.titleWrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height:46px;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
.titleWrap .title{
  width: 20%;
  font-weight: bold;
}
.titleWrap .more{
  width: 15%;
  font-size: 14px;
  color: #999;
}
.freeClinicSlider{
  height: 35vh;
}
.list li a{
  display: flex;
  padding:10px 5px;
  border-bottom: 1px solid #eee;
}
.itemImg{
  flex: 3;
  height: 14vh;
}
.itemImg img{
  border-radius: 3px;
}
.itemText{
  flex:5;
  display:flex;
  flex-wrap: wrap;
  padding-left: 10px;
}
.textWrap{
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.textWrap p{
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  line-height: 18px;
}
.tags{
  display: flex;
  width: 100%;
  justify-content:space-between;
  align-items: flex-end;
  color: #999;
}
.freeClinicItem{
  border-radius: 5px;
  overflow: hidden;
}
</style>
