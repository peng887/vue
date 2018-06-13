<template>
  <div class="Department" :style="{height:style.height}">
    <ul>
      <li @click="selectLevelOne(index,item)" v-for="(item,index) in levelOne" :id="item.id" :class='{"active":levelOneId==item.id}'>{{item.name}}</li>
    </ul>
    <ul>
      <li @click="selectLevelTwo(index,item)" v-for="(item,index) in levelTwo" :id="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  data(){
    return {
      levelOne:"",
      levelTwo:"",
      levelOneId:"",
      levelTwoId:"",
      style:{
        height:""
      }
    }
  },
  beforeCreate(){
    this.$axios({
      method:'post',
      url:"/dsjk/api/keshi/list.do",
      data:{}
    }).then((res)=>{
      this.levelOne=res.data.data
      let winHeight = document.documentElement.clientHeight;//可视区height
      this.style.height=winHeight-87+'px';
      console.info(this)
    })
  },
  methods:{
    selectLevelOne(index,item){
      this.town="";
      let id=item.id;
      this.$axios({
        method:'post',
        url:"/dsjk/api/keshi/list.do",
        data:{
          parentId:id
        }
      }).then((res)=>{
        this.levelTwo=res.data.data
        this.levelOneId=item.id;
      })
    },
    selectLevelTwo(){
      alert(1)
    }
  }
}
</script>

<style scoped="true">
.Department{
  display: flex;
  justify-content: center;
  margin-top: 87px;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  background: #fff;
}
.Department ul{
  flex: 1;
  border-right: 1px solid #eee;
  overflow:scroll;
}
.Department ul:nth-child(3n){
  border-right: none;
}
.Department ul li{
  line-height: 40px;
  border-bottom: 1px solid #eee;
}
.active{
  color: #fff;
  background: #26a2ff;
}
</style>
