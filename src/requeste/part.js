// 获取角色列表方法
import axios from "../utils/http";

export async function getPartList() {
    const res = await axios.get("/rolelist");
    if (res.code == 200) {
        return res.list
    } else {
        return false
    }
} 