import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

// 函数判断是否含有某网址
function hasPower(url){
  return store.state.user.menus_url.some(i => i==url);
}

var router= new Router({
  routes: [
     {
       path:'/login',
       component:()=>import('../pages/login/login.vue')
     },
     {
       path:'/',
       component:()=>import('../pages/index/index.vue'),
       children:[
          {
            path:'home',
            component:()=>import('../pages/home/home.vue'),
            name:'主页'
          },
          {
           path:'menu',
           component:()=>import('../pages/menu/menu.vue'),
           name:'菜单管理',
           beforeEnter(to,from,next){
             hasPower('/menu')?next():next('/home');
           }
          },
          {
            path:'role',
            component:()=>import('../pages/role/role.vue'),
            name:'角色管理',
            beforeEnter(to,from,next){
              hasPower('/role')?next():next('/home');
            }
          },
          {
              path:'manage',
              component:()=>import('../pages/manage/manage.vue'),
              name:'管理员管理',
              beforeEnter(to,from,next){
                hasPower('/manage')?next():next('/home');
              }
          },
          {
            path:'cate',
            component:()=>import('../pages/cate/cate.vue'),
            name:'商品分类',
            beforeEnter(to,from,next){
              hasPower('/cate')?next():next('/home');
            }
          },
          {
            path:'spec',
            component:()=>import('../pages/spec/spec.vue'),
            name:'商品规格',
            beforeEnter(to,from,next){
              hasPower('/spec')?next():next('/home');
            }
          },
          {
            path:'goods',
            component:()=>import('../pages/goods/goods.vue'),
            name:'商品管理',
            beforeEnter(to,from,next){
              hasPower('/goods')?next():next('/home');
            }
          },
          {
            path:'member',
            component:()=>import('../pages/member/member.vue'),
            name:'会员管理',
            beforeEnter(to,from,next){
              hasPower('/member')?next():next('/home');
            }
          },
          {
            path:'banner',
            component:()=>import('../pages/banner/banner.vue'),
            name:'轮播图管理',
            beforeEnter(to,from,next){
              hasPower('/banner')?next():next('/home');
            }
          },
          {
            path:'seckill',
            component:()=>import('../pages/seckill/seckill.vue'),
            name:'秒杀活动',
            beforeEnter(to,from,next){
              hasPower('/seckill')?next():next('/home');
            }
          },
          {
            path:'',
            redirect:'home'
          }
       ]
     }
  ]
})
// 登录前拦截
router.beforeEach((to,from,next)=>{
     if(to.path==='/login'){
        next();
        return
     }
     if(store.state.user){
        next();
        return;
     }
     next('/login')
})

export default router