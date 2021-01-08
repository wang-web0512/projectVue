import Vue from "vue";
import element from "element-ui";


// 注册
Vue.use(element);

// 封装成功提示
// message： 调用时传递的消息体
Vue.prototype.$success = function (message) {
    this.$message({
        type: 'success',
        message
    })
}

// 封装失败提示
Vue.prototype.$error = function (message) {
    this.$message({
        type: 'error',
        message
    })
}

// 封装删除数据提示框
Vue.prototype.$myconfirm = function (callback) {
    this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback&&callback()
    }).catch(() => {
        
    });
}
