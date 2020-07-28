<template>
  <div>
      <el-button type='primary' @click="add">添加</el-button>
      <v-add :info='info' ref="add"></v-add>
      <v-list @edit='edit'></v-list>
  </div>
</template>
 <script>
 import vAdd from './components/add'
 import vList from './components/list'
 export default {
components: {
  vList,
  vAdd
},
 data() {
 return {
   info:{
     show:false,
     isAdd:true,
     title:'角色修改'
   }
 };
 },
 methods:{
  // 添加出现弹框
   add(){
     this.info.show=true;
     this.info.title='角色添加',
     this.info.isAdd=true
   },
  //  修改出现弹框
   edit(id){
     this.info.title='角色修改',
     this.info.show=true,
     this.info.isAdd=false,
     this.$refs.add.getDetail(id);
   }
 },
 mounted(){},
 };
</script>
<style scoped>
</style>