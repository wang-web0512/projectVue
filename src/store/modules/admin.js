// 导入数据请求方法  按需请求
import { getAdminList, getAdminTotal } from "@/requeste/admin.js";

export default {
    namespaced: true,
    state() {
        return {
            // 管理员列表
            adminList: [],
            // 管理员总数
            adminTotal: 0

        }
    },
    mutations: {
        // 初始化管理员列表
        adminInit(state, list) {
            state.adminList = list
        },
        // 初始化总数
        adminTotaleInit(state, total) {
            state.adminTotal = total
        }
    },
    actions: {
        // 请求管理员列表
        adminActions({ commit }, params) {
            getAdminList(params).then(res => {
                // console.log(res,8888);
                if (res) {
                    commit('adminInit', res)
                }
            })
        },
        adminActionsTotale({ commit }) {
            getAdminTotal().then(res => {
                if (res) {
                    commit('adminTotaleInit', res)
                }
            })
        }
    }

}