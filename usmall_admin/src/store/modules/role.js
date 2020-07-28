import {requestRoleList} from '../../util/request'
const state={
    rolelist:[]
}
const mutations={
   changeRoleList(state,arr){
         state.rolelist=arr
         console.log(state.rolelist)
   }
}
const actions={
    requestchangeRoleList(context){
        requestRoleList().then(res=>{
            context.commit('changeRoleList',res.data.list);
        })
    }
}
const getters={
    rolelist(state){
      return state.rolelist
    } 
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}