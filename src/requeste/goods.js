// 获取商品列表方法
import axios from "../utils/http";

// 获取商品列表
// params={page:"页码",size:'每页显示数据的条数'}
export async function getGoodsList(params) {
    const res = await axios.get('/goodslist', { params });
    if (res.code == 200) {
        return res.list
    } else {
        return false
    }
}

// 获取数据的总条数
export async function getGoodsTotal() {
    const res = await axios.get('/goodscount');
    if (res.code == 200) {
        return res.list[0].total;
    } else {
        return false
    }
}