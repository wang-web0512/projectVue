// 导入数据请求方法  按需请求
import { getClassifyList } from "@/requeste/classify";

export default {
    namespaced: true,
    state() {
        return {
            // 菜单列表
            classifyList: []
        }
    },
    mutations: {
        //    菜单初始化
        classifyInit(state, list) {
            state.classifyList = list
        }
    },
    actions: {
        // 请求菜单列表
       classifyActions({commit}) {
        getClassifyList().then(res=>{
                // console.log(res,8888);
                if(res){
                    commit('classifyInit',res)
                }
            })
        }
    }

}