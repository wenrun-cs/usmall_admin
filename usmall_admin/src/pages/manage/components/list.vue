<template>
  <div>
    <el-table :data="managelist" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="250">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size='size' @current-change='getpage' :total="total"></el-pagination>
  </div>
</template>
 <script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { delManageDetail } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      managelist: "manage/managelist",
      total:'manage/total',
      size:'manage/size'
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestManagelist: "manage/requestManagelist",
      requestTotal:'manage/requestTotal',
      requestPage:'manage/requestPage'
    }),
    edit(uid) {
      this.$emit("edit", uid);
    },
    del(uid) {
      delManageDetail({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          successAlert("管理员信息删除成功");
          this.requestManagelist();
        } else {
          warningAlert(rs.data.msg);
        }
      });
    },
    getpage(num){
        this.requestPage(num);
         this.requestManagelist();
    }
  },
  mounted() {
    this.requestManagelist();
    this.requestTotal();
  },
};
</script>
<style scoped>
</style>