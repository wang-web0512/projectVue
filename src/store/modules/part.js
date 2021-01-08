// 导入数据请求方法  按需请求
import { getPartList } from "@/requeste/part.js";

export default {
    namespaced: true,
    state() {
        return {
            // 菜单列表
            PartList: []
        }
    },
    mutations: {
        //    菜单初始化
        partInit(state, list) {
            state.PartList = list
        }
    },
    actions: {
        // 请求菜单列表
        getpartActions({commit}) {
            getPartList().then(res=>{
                // console.log(res,8888);
                if(res){
                    commit('partInit',res)
                }
            })
        }
    }

}