<template>
  <div>
    <el-table :data="seckillList" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 <script>
import { mapGetters, mapActions } from "vuex";
import {delSeckillDetail}  from '../../../util/request'
import {successAlert,warningAlert} from '../../../util/alert'
export default {
  computed: {
    ...mapGetters({
      seckillList: "seckill/list",
      goods:'goods/list'
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestchangeSeckillList: "seckill/requestchangeSeckillList",
    }),
     update(id){
     this.$emit('edit',id);
    },
    del(id){
       this.$confirm('你确定要删除这条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // 发起删除请求
         delSeckillDetail({id:id}).then(res=>{
             if(res.data.code==200){
                successAlert('秒杀信息删除成功');
                this.requestchangeSeckillList();
             }else{
                warningAlert(res.data.msg); 
             }
         })
        }).catch(() => {
            this.$message({
            type: "info",
            message: "已取消删除",
          });   
        });
    }
  },
  mounted() {
    this.requestchangeSeckillList();
  },
};
</script>
<style scoped>
</style>