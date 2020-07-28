<template>
  <div>
      <el-button type="primary" @click='add'>添加</el-button>
      <v-add :info='info' ref="add"></v-add>
      <v-list @edit='edit'></v-list>
  </div>
</template>
 <script>
 import vAdd from './components/add'
 import vList from './components/list'
 export default {
components: {
  vAdd,
  vList
},
 data() {
 return {
    info:{
       show:false,
       isAdd:true,
       title:'添加商品分类信息'
    }
 };
 },
 methods: {
   add(){
       this.info.show=true,
       this.info.isAdd=true,
       this.info.title='添加商品分类信息'
   },
   edit(id){
       this.info.show=true,
       this.info.isAdd=false,
       this.info.title='修改商品分类信息'
       this.$refs.add.getDetail(id)
   }
 },
 mounted(){},
 };
</script>
<style scoped>
</style>