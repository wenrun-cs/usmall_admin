<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <!--数组 -->
      <el-table-column prop="attrs" label="规格属性" width="250">
       <template slot-scope="scope">
            <el-tag v-for='(item,index) in scope.row.attrs' :key="index">
              {{item}}
            </el-tag>
       </template>
      </el-table-column>
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
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" @current-change="cPage" :page-size="size" :total="total"></el-pagination>
  </div>
</template>
 <script>
 import {mapGetters,mapActions} from 'vuex'
 import {successAlert,warningAlert} from '../../../util/alert'
 import {requestSpecList,deleteSpecDetail,updateSpecDetail} from '../../../util/request'
export default {
  computed:{
      ...mapGetters({
          list:'spec/list',
          total:'spec/total',
          size:'spec/size'
      })
  },
  data() {
    return {
    };
  },
  methods: {
      ...mapActions({
           requestSpecList:'spec/requestSpecList',
           requestSpecCount:'spec/requestSpecCount',
           requestSpecPage:'spec/requestSpecPage'
      }),
    //   修改
    update(id){
        this.$emit('edit',id);
    },
     del(id){
     deleteSpecDetail({id:id}).then(res=>{
         if(res.data.code==200){
             successAlert('删除成功')
             this.requestSpecList()
            this.requestSpecCount()
         }else{
             warningAlert(res.data.msg)
         }
     })
    },
    cPage(num){
     this.requestSpecPage(num)
      this.requestSpecList()
  }
  },
  
  mounted() {
      this.requestSpecList()
      this.requestSpecCount()
},
};
</script>
<style scoped>
</style>