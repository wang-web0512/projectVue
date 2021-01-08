 <template>
  <fullscreen ref="fullscreen">
    <el-container>
      <el-aside :width="flag ? '64px' : '226px'">
        <p class="layout-text">小U商城后台</p>
        <!-- 主导航 -->
        <!-- router:使用后index将作为path进行路由跳转 -->
        <el-menu
          unique-opened
          :collapse-transition="false"
          :collapse="flag"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333"
          text-color="#fff"
          active-text-color="#fff"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>

          <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>

          <el-menu-item index="/menu">
            <span slot="title">菜单管理</span>
          </el-menu-item>

          <el-menu-item index="/part">
            <span slot="title">角色管理</span>
          </el-menu-item>

          <el-menu-item index="/admin">
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-shopping-bag-1"></i>
            <span>商城管理</span>
          </template>

          <el-menu-item index="/classify">
            <span slot="title">分类管理</span>
          </el-menu-item>

          <el-menu-item index="/spec">
            <span slot="title">规格管理</span>
          </el-menu-item>

          <el-menu-item index="/goods">
            <span slot="title">商品管理</span>
          </el-menu-item>

          <el-menu-item index="3-4">
            <span slot="title">轮播图管理</span>
          </el-menu-item>

          <el-menu-item index="3-5">
            <span slot="title">会员管理</span>
          </el-menu-item>

          <el-menu-item index="3-6">
            <span slot="title">秒杀活动</span>
          </el-menu-item>

          <el-menu-item index="/lianxi">
            <span slot="title">联系</span>
          </el-menu-item>
        </el-submenu> -->

          <el-submenu
            :index="item.id + ''"
            v-for="item in menueList"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-shopping-bag-1"></i>
              <span>{{ item.title }}</span>
            </template>

            <el-menu-item
              :index="val.url"
              v-for="val in item.children"
              :key="val.id"
            >
              <span slot="title">{{ val.title }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 左边 -->
          <!--size="mini"  最小的尺寸 -->
          <el-button
            type="primary"
            icon="el-icon-s-fold"
            size="mini"
            @click="fun"
          ></el-button>

          <el-breadcrumb separator="/">
            <el-breadcrumb-item>管理中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- circle 属性 不需要值 可改变为圆形 -->
          <el-button
            @click="$router.back()"
            icon="el-icon-back"
            circle
          ></el-button>

          <!-- 右边 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>

              <el-dropdown-item icon="el-icon-full-screen"
                ><span @click="magnify">全屏预览</span></el-dropdown-item
              >

              <el-dropdown-item icon="el-icon-switch-button"
                ><span @click="quit">安全退出</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <!-- 二级路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </fullscreen>
</template>

<script>
import Vue from "vue";
// 导入全屏显示组件vue-fullscreen
import fullscreen from "vue-fullscreen";

Vue.use(fullscreen);
export default {
  created() {
    this.menueListInit();
    this.usernameInit();
  },
  data() {
    return {
      // 用户名
      username: "",
      // 导航菜单数组
      menueList: [],
      flag: false,
    };
  },
  methods: {
    // 用户名初始化方法
    usernameInit() {
      // 读取本地存储
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo") || "{}");
      // 更新数据
      this.username = loginInfo.username;
    },
    // 全屏显示方法
    magnify() {
      this.$refs.fullscreen.toggle();
    },
    // 安全退出
    quit() {
      // 删除本地存储中的登录凭证
      localStorage.removeItem("loginInfo");
      this.$success("退出成功");
      // 自动跳转到登录页面
      this.$router.push("/login");
    },
    // 导航栏折叠效果
    fun() {
      this.flag = !this.flag;
    },
    // 初始化导航菜单方法
    menueListInit() {
      // 读取本地存储
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo") || "{}");
      // 更新数据
      // console.log(loginInfo);
      this.menueList = loginInfo.menus;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  overflow: hidden;
}
.layout-text {
  font-size: 19px;
  background: #444;
  color: white;
  line-height: 60px;
  letter-spacing: 5px;
  text-align: center;
  white-space: nowrap;
}
.el-header {
  position: relative;
  background-color: #fff;
  line-height: 60px;
  display: flex;
  align-items: center;
}
/* 导航高亮类名 */
.is-active {
  background-color: #409eff !important;
}
/* 面包屑导航 */
.el-breadcrumb {
  margin: 0 20px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}
/* 右边 */
.el-dropdown {
  position: absolute;
  right: 30px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-menu {
  height: calc(100vh - 60px);
  border: 0;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-button {
  padding: 0;
  width: 30px;
  height: 30px;
}
</style>