<template>
  <div>
    <el-table :data="memberlist" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
           <template slot-scope="scope">
                <el-button type='primary' v-if="scope.row.status==1">启用</el-button>
                <el-button type='info' v-else>禁用</el-button>
           </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
               <el-button type='primary' @click="update(scope.row.uid)">编辑</el-button>
               <!-- <el-button type='danger' @click="del(scope.row.id)">删除</el-button> -->
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
          memberlist:'member/list'
      })
  },
  data() {
    return {
    };
  },
  methods: {
      ...mapActions({
           requestChangeList:'member/requestChangeList'
      }),
    //   修改
    update(uid){
        this.$emit('edit',uid);
    },
    //  del(id){
    //  delRoleDetail({id:id}).then(res=>{
    //      if(res.data.code==200){
    //          successAlert('删除成功')
    //          this.requestchangeRoleList()
    //      }else{
    //          warningAlert(res.data.msg)
    //      }
    //  })
    // }
  },
  mounted() {
      this.requestChangeList()
  },
};
</script>
<style scoped>
</style>