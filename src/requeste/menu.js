// 获取菜单列表方法
import axios from "../utils/http";

export async function getMenuList() {
    const res = await axios.get("/menulist?istree=1");
    if (res.code == 200) {
        return res.list
    } else {
        return false
    }
} 