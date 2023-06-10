// 路由可变,动态加载
// 存储方式: 1.存前端 2.存数据库
// 优点: 1.灵活 2.安全性

// 思路
// 1.解析路由表,生成路由,添加路由
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: staticRoute         // 静态路由
})

let isToken = true
router.beforeEach((to, from, next) => {
    if (isToken && store.state.routers.length !== 0) {
        const dynamicRouter = store.state.routers;
        dynamicRouter.forEach(v => {
            v.children = routerChildren(v.children)
            v.component = routerCom(v.component);
            router.addRoute(v);
        })
        isToken = false;
        next({
            ...to,
            replace: true,
        })
    } else {
        if (to.name === null) {
            next('/404');
        } else {
            if (to.name.title) {
                document.title = to.meta.title;
            }
            next();
        }
    }
})

// 加载路由文件
function routerCom(path) {      
    return (resolve) => require([`@/views/${path}`], resolve);
}

// 递归处理 子路由
function routerChildren(children) {
    children.forEach(v => {
        v.component = routerCom(v.component);
        if (v.children !== undefined) {
            v.children = routerChildren(v.children);
        }
    })
    return children;
}

// 
const dynamicRoute = [{
    "path": "/home",
    "name": "home",
    "redirect": "/home/index",
    "component": "home/index.vue",
    "children": [{
        "path": "index",
        "name": "index",
        "component": "index/index.vue",
        "meta": {
          "name": "index",
          "title": "首页",
          "icon": "el-icon-location",
          "menu":true //true为菜单栏
        }
      },
      {
        "path": "Configuration",
        "name": "Configuration",
        "redirect": "Configuration/route",
        "component": "Configuration/index.vue",
        "roles": ['developer', "admin"], //  developer、admin角色的用户才能访问该页面
        "meta": {
          "title": "配置",
          "icon": "el-icon-location",
          "menu":true
        },
        "children": [{
            "path": "route",
            "name": "route",
            "component": "Configuration/route/index.vue",
            "meta": {
              "title": "菜单",
              "icon": "",
              "menu":true
            },
          }, {
            "path": "user",
            "name": "user",
            "component": "Configuration/user/index.vue",
            "meta": {
              "title": "用户管理",
              "icon": "el-icon-location",
              "menu":true
            },
          },
          {
            "path": "admin",
            "name": "admin",
            "component": "Configuration/admin/index.vue",
            "meta": {
              "title": "管理员管理",
              "icon": "",
              "menu":true
            },
          },
          
          {
            "path": "userEdit",
            "name": "userEdit",
            "component": "Configuration/user/user-Edit.vue",
            "meta": {
              "title": "编辑用户",
              "icon": "",
              "menu":false
            },
          },  
        ]
      },
      {
        "path": "check",
        "name": "check",
        "redirect": "check/user",
        "component": "check/index.vue",
        "roles": ['developer', "admin", "check"], //  developer、admin角色的用户才能访问该页面
        "meta": {
          "title": "审核",
          "icon": "el-icon-location",
          "menu":true
        },
        "children": [{
            "path": "user",
            "name": "checkUser",
            "component": "check/check-user/index.vue",
            "meta": {
              "title": "用户实名审核",
              "icon": "el-icon-location",
              "menu":true
            }
          },
          {
            "path": "enterprise",
            "name": "checkEnterprise",
            "component": "check/check-enterprise/index.vue",
            "meta": {
              "title": "企业认证审核",
              "icon": "el-icon-location",
              "menu":true
            },
          },
          {
            "path": "checkNormImage",
            "name": "checkNormImage",
            "component": "check/check-norm-image/index.vue",
            "meta": {
              "title": "标准照认证审核",
              "icon": "el-icon-location",
              "menu":true
            },
          },
          {
            "path": "checkHiringJobs",
            "name": "checkHiringJobs",
            "component": "check/check-hiring-Jobs/index.vue",
            "meta": {
              "title": "求职、招聘认证审核",
              "icon": "el-icon-location",
              "menu":true
            },
          }
        ]
      }
    ]
  }]
  

export default router;