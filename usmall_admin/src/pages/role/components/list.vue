<template>
  <div>
    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
           <template slot-scope="scope">
                <el-button type='primary' v-if="scope.row.status==1">启用</el-button>
                <el-button type='info' v-else>禁用</el-button>
           </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
               <el-button type='primary' @click="update(scope.row.id)">编辑</el-button>
               <el-button type='danger' @click="del(scope.row.id)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
 import {mapGetters,mapActions} from 'vuex'
 import {successAlert,warningAlert} from '../../../util/alert'
 import {requestRoleList,delRoleDetail} from '../../../util/request'
export default {
  computed:{
      ...mapGetters({
          rolelist:'role/rolelist'
      })
  },
  data() {
    return {
    };
  },
  methods: {
      ...mapActions({
           requestchangeRoleList:'role/requestchangeRoleList'
      }),
    //   修改
    update(id){
        this.$emit('edit',id);
    },
     del(id){
     delRoleDetail({id:id}).then(res=>{
         if(res.data.code==200){
             successAlert('删除成功')
             this.requestchangeRoleList()
         }else{
             warningAlert(res.data.msg)
         }
     })
    }
  },
  mounted() {
      this.requestchangeRoleList()
  },
};
</script>
<style scoped>
</style>