// 导入请求数据方法
import { getSpecList, getSpecTotal } from '../../requeste/spec';
export default {
    namespaced: true,
    state() {
        return {
            // 规格列表
            specList: [],
            // 规格总条数
            specTotal: 0,
        }
    },
    mutations: {
        // 初始化
        specInit(state, list) {
            state.specList = list;
        },
        specTotalInit(state, count) {
            state.specTotal = count;
        }
    },
    actions: {
        // 请求规格列表
        getSpecAction({ commit }, params) {
            getSpecList(params).then(res => {
                if (res) {
                    commit('specInit', res)
                }
            })
        },
        getSpecTotalAction({ commit }) {
            getSpecTotal().then(res => {
                if (res) {
                    commit('specTotalInit', res)
                }
            })
        }
    }
}