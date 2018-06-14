<template></template>
<script>
  const upFile = (btn,_this) => {
    let file=btn.files[0];
    console.info(file)
    let formData = new FormData();
    formData.append("file",file);
    _this.$axios({
      method:'post',
      url:'/dsjk/api/file/upload.do',
      data:formData
    }).then((res)=>{
      _this.$indicator.close();
      if(res.data.code==200){
        _this.fileUrl='http://dsjkoss.oss-cn-beijing.aliyuncs.com/ds17070301/'+res.data.data.fileName;
      }else{
        _this.$toast(res.data.message);
      }
    }).catch((err) => {
      _this.$indicator.close();
      _this.$toast("网络错误");
    })
  }

  export default
  {
    upFile
  }
</script>
<style scoped="true">

</style>
