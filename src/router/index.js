import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import("../pages/Login");
const Layout = () => import("../pages/Layout");
const Home = () => import("../pages/Home");
// 导入菜单管理组件
const Menu = () => import("../pages/menu/index");
const Part = () => import("../pages/part/part");
const Admin = () => import("../pages/admin/admin");
const Classify = () => import("../pages/classify/classify");
const Spec = () => import("../pages/spec/spec");
const Goods = () => import("../pages/goods/goods");


Vue.use(Router)

// 定义路由规则
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '管理员登录'
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: {
      title: '小U商城管理'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          title: '管理中心'
        }
      },
      {
        path: '/menu',
        component: Menu,
        meta: {
          title: "菜单管理"
        }
      },

      {
        path: '/role',
        component: Part,
        meta: {
          title: "角色管理"
        }
      },
      {
        path: '/admin',
        component: Admin,
        meta: {
          title: "管理员管理"
        }
      },
      {
        path: '/category',
        component: Classify,
        meta: {
          title: "分类管理"
        }
      },
      {
        path: '/specs',
        component: Spec,
        meta: {
          title: "规格管理"
        }
      },
      {
        path: '/goods',
        component: Goods,
        meta: {
          title: "商品管理"
        }
      },

    ]
  },

]
// 创建路由对象
const router = new Router({
  routes
});

// 添加全局导航守卫
router.beforeEach(function (to, from, next) {
  //  读取本地存储
  // JSON.parse()方法将字符串转为json对象
  let loginQu = JSON.parse(localStorage.getItem('loginInfo') || '{}');
  // 判断用户访问页面是否为登录页面
  if (to.path !== '/login') {
    // console.log(loginInfo.token,9999);
    // 如果没登录进行重定向
    if (!loginQu.token) {
      return next('/login')
    }
    let menusUrl = loginQu.menus_url;
    menusUrl.push("/home")
    menusUrl.push("/")
    if (menusUrl.indexOf(to.path) == -1) {
      return next('/home')
    }

  }


  next();
  // console.log(to);
  document.title = to.meta.title
})
export default router;

