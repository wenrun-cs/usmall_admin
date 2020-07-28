<template>
  <div>
    <!-- 表单 -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号"  width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称"  width="180"></el-table-column>
      <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
             <img :src="$imgPre+scope.row.img" alt="">
          </template>
      </el-table-column>
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
import {delCateDetail} from '../../../util/request'
import { successAlert ,warningAlert} from '../../../util/alert';
export default {
  computed:{
      ...mapGetters({
            list: "cate/list",
      })
  },
  data() {
    return {
    };
  },
  methods:{
     ...mapActions({
        requestCateList:'cate/requestCateList'
     }),
    //  编辑按钮
     edit(id){
        this.$emit('edit',id);
     },
     del(id){
         this.$confirm('你确定要删除这条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // 发起删除请求
         delCateDetail({id:id}).then(res=>{
             if(res.data.code==200){
                successAlert('商品分类信息删除成功');
                this.requestCateList();
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
      this.requestCateList();
  }
};
</script>
<style scoped>
img{
  width: 200px;
}
</style>