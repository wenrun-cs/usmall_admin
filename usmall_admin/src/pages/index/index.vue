<template>
  <div>
    <el-container class="page">
      <!-- 左边栏 -->
      <el-aside width="200px">
        <!--下拉导航开始-->
        <!-- 导航开始 -->
        <!-- 
            router 路由模式
            index 是唯一标识，配置了路由，就改为自己的path
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :unique-opened="true"
        >
          <!-- 首页 -->
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span>首页</span>
          </el-menu-item>

          <!-- 有目录的循环 -->
          <!-- <el-submenu v-show="hasChildren" :index="item.id+''" v-for="item in user.menus" :key="item.id"  >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item  v-for="i in item.children" :key="i.title" :index="i.url">
            {{i.title}}
            </el-menu-item>
          </el-submenu>-->

          <!-- 没有目录的循环 -->
          <!-- <el-menu-item v-show="!hasChildren" v-for="i in user.menus" :key="i.title" :index="i.url">
            <span lot="title">{{i.title}}</span>
          </el-menu-item>-->

          <!-- 混合 -->
          <template v-for="item in user.menus">
            <el-submenu v-if="item.children" :key="item.id" :index="item.id+''">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="i in item.children" :key="i.title" :index="i.url">{{i.title}}</el-menu-item>
            </el-submenu>

            <el-menu-item v-if="!item.children"  :key="item.id" :index="item.url">{{item.title}}</el-menu-item>
          </template>

          <!-- 商城管理
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/spec">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-submenu>-->
        </el-menu>
        <!-- 下拉导航结束 -->
      </el-aside>
      <!-- 头部和主体 -->
      <el-container>
        <el-header>
          <div class="header-con">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="exit">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="maina">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
 <script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
    // hasChildren() {
    //   return this.user.menus[0].children ? true : false;
    // },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestUser: "requestUser",
    }),

    exit() {
      this.requestUser(null);
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
  overflow: hidden;
}
.page {
  height: 100vh;
}
.header-con {
  float: right;
}
.header-con span {
  line-height: 60px;
  color: #fff;
}
.maina {
  margin-bottom: 20px;
}
</style>