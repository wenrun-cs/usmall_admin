<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="100"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="120"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="100"></el-table-column>
      <!-- 图片 -->
      <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
             <img :src="$imgPre+scope.row.img" alt="">
          </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="100">
           <template slot-scope="space">
              <el-button type='primary' v-if="space.row.isnew">是</el-button>
              <el-button type='danger' v-else>否</el-button>
          </template>
      </el-table-column>
      <!-- 是否热卖 -->
      <el-table-column prop="ishot" label="是否热卖" width="100">
          <template slot-scope="space">
              <el-button type='primary' v-if="space.row.ishot">是</el-button>
              <el-button type='danger' v-else>否</el-button>
          </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column prop="status" label="状态" width="100">
           <template slot-scope="scope">
                <el-button type='primary' v-if="scope.row.status==1">启用</el-button>
                <el-button type='info' v-else>禁用</el-button>
           </template>
      </el-table-column>
      <!-- 操作 -->
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
 import {deleteGoodsDetail} from '../../../util/request'
export default {
  computed:{
      ...mapGetters({
          list:'goods/list',
          total:'goods/total',
          size:'goods/size'
      })
  },
  data() {
    return {
    };
  },
  methods: {
      ...mapActions({
           requestAllGoodsList:'goods/requestAllGoodsList',
           requestGoodsCount:'goods/requestGoodsCount',
           requestGoodsPage:'goods/requestGoodsPage'
      }),
    //   修改
    update(id){
        this.$emit('edit',id);
    },
     del(id){
     deleteGoodsDetail({id:id}).then(res=>{
         if(res.data.code==200){
             successAlert('删除成功')
             this.requestAllGoodsList()
            this.requestGoodsCount()
         }else{
             warningAlert(res.data.msg)
         }
     })
    },
    cPage(num){
     this.requestGoodsPage(num)
      this.requestAllGoodsList()
  }
  },
  
  mounted() {
      this.requestAllGoodsList()
      this.requestGoodsCount()
},
};
</script>
<style scoped>
img{
    width: 150px;
}
</style>