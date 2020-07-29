<template>
  <div>
       <v-add :info='info' ref="add"></v-add>
       <v-list @edit='edit'></v-list>
  </div>
</template>
 <script>
 import vAdd  from './components/add'
 import vList from './components/list'
 export default {
components: {
  vList,
  vAdd
},
 data() {
 return {
   info:{
     show:false
   }
 };
 },
 methods: {
   edit(uid){
      this.info.show=true;
      this.$refs.add.getDetail(uid)
   }
 },
 mounted(){},
 };
</script>
<style scoped>
</style>