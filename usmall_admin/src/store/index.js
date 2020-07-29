import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)


import {state , mutations,getters} from './mutations'
import actions from './actions'
import menu from './modules/menu'
import role from './modules/role'
import manage from './modules/manage'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seckill from './modules/seckill'
export default new vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        manage,
        cate,
        spec,
        goods,
        member,
        banner,
        seckill
    }
})