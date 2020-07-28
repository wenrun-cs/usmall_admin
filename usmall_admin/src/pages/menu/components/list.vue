<template>
  <div>
    <!-- 表单 -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="菜单编号"  width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称"  width="180"></el-table-column>
      <el-table-column prop="icon" label="菜单图标">
          <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
          </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
          <template slot-scope="scope">
              <el-button type='primary' v-if="scope.row.status==1">启用</el-button>
              <el-button type='danger' v-else>禁用</el-button>
          </template>
      </el-table-column>
      <el-table-column label="操作">
         <template slot-scope="scope">
              <el-button type='primary' @click="edit(scope.row.id)">编辑</el-button>
              <el-button  type='danger' @click="del(scope.row.id)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
  </div>
</template>
 <script>
 import {mapGetters,mapActions} from 'vuex'
import {delMenuDetail} from '../../../util/request'
import { successAlert ,warningAlert} from '../../../util/alert';
export default {
  computed:{
      ...mapGetters({
          tableData:'menu/menuList'
      })
  },
  data() {
    return {
    };
  },
  methods:{
     ...mapActions({
        requestChangemenuList:'menu/requestChangemenuList'
     }),
    //  编辑按钮
     edit(id){
         console.log(id);
        this.$emit('edit',id);
     },
     del(id){
         this.$confirm('你确定要删除这条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // 发起删除请求
         delMenuDetail({id:id}).then(res=>{
             if(res.data.code==200){
                successAlert(res.data.msg);
                this.requestChangemenuList();
             }else{
                warningAlert(res.data.msg) 
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
      this.requestChangemenuList();
  }
};
</script>
<style scoped>
</style>