// 分类管理列表获取方法
import axios from "../utils/http";

export async function getClassifyList() {
    const res = await axios.get("/catelist?istree=1");
    if (res.code == 200) {
        return res.list
    } else {
        return false
    }
} 