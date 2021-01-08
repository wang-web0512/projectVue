// 获取菜单列表方法
import axios from "../utils/http";

// 获取管理员列表
// params={page:"页码",size:'每页显示数据的条数'}
export async function getSpecList(params) {
    const res = await axios.get('/specslist', { params });
    if (res.code == 200) {
        return res.list
    } else {
        return false
    }
}

// 获取数据的总条数
export async function getSpecTotal() {
    const res = await axios.get('/specscount');
    if (res.code == 200) {
        return res.list[0].total;
    } else {
        return false
    }
}