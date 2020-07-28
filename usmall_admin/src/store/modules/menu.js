import {requestMenuList} from '../../util/request'

const state={
    menuList:[]  
}

const mutations={
    changemenuList(state,arr){
        state.menuList=arr
    }
}
const actions={
    requestChangemenuList(context){
        requestMenuList({istree:true}).then(res=>{
            context.commit('changemenuList',res.data.list);
        })
    }
}
const getters={
    menuList(state){
        return  state.menuList
    }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}