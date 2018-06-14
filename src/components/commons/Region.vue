<template>
  <div class="Region" :style="{height:style.height}">
    <ul>
      <li @click="changeProvince(index,item)" v-for="(item,index) in province" :id="item.id" :class='{"active":provinceId==item.id}'>{{item.name}}</li>
    </ul>
    <ul>
      <li @click="changeCity(index,item)" v-for="(item,index) in city" :id="item.id" :class='{"active":cityId==item.id}'>{{item.name}}</li>
    </ul>
    <ul>
      <li @click="changeTown(index,item)" v-for="(item,index) in town" :id="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  data(){
    return {
      province:"",
      city:"",
      town:"",
      provinceId:"",
      cityId:"",
      style:{
        height:""
      }
    }
  },
  beforeCreate(){
    this.$axios({
      method:'post',
      url:"/dsjk/api/area/list.do",
      data:{}
    }).then((res)=>{
      this.province=res.data.data
      let winHeight = document.documentElement.clientHeight;//可视区height
      this.style.height=winHeight-87+'px';
    })
  },
  methods:{
    changeProvince(index,item){
      this.town="";
      this.$axios({
        method:'post',
        url:"/dsjk/api/area/list.do",
        data:{
          parentId:item.id
        }
      }).then((res)=>{
        this.city=res.data.data
        this.provinceId=item.id;
      })
    },
    changeCity(index,item){
      this.$axios({
        method:'post',
        url:"/dsjk/api/area/list.do",
        data:{
          parentId:item.id
        }
      }).then((res)=>{
        this.town=res.data.data
        this.cityId=item.id;
      })
    },
    changeTown(index,item){
      this.$emit("regionUpdate",item.id)
    }
  }
}
</script>

<style scoped="true">
.Region{
  display: flex;
  justify-content: center;
  margin-top: 87px;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  background: #fff;
}
.Region ul{
  flex: 1;
  border-right: 1px solid #eee;
  overflow:scroll;
}
.Region ul:nth-child(3n){
  border-right: none;
}
.Region ul li{
  line-height: 40px;
  border-bottom: 1px solid #eee;
}
.active{
  color: #fff;
  background: #26a2ff;
  border-radius: 3px;
}
</style>
