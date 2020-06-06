import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login'
import Index from '../views/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About')
    },


    {
        path: '/login',
        component: Login
    },
    {
        path: '/index',
        name: '用户管理',
        component: Index,
        redirect: '/userlist',
        children: [
            {
                path: '/userlist',
                name: '用户列表',
                component: () => import('../views/UserList')
            },
            {
                path: '/boardlist',
                name: '公告列表',
                component: () => import('../views/BoardList')
            },
            {
                path: '/addboard',
                name: '新增公告',
                component: () => import('../views/addBoard')
            },
            {
                path: '/newslist',
                name: '新闻列表',
                component: () => import('../views/NewsList')
            },
            {
                path: '/addnews',
                name: '新增新闻',
                component: () => import('../views/addNews')
            },
            {
                path: '/projectlist',
                name: '项目列表',
                component: () => import('../views/ProjectList')
            },
            {
                path: '/addproject',
                name: '新增项目',
                component: () => import('../views/addProject')
            },
            {
                path: '/volunteerlist',
                name: '志愿者列表',
                component: () => import('../views/VolunteerList')
            },
            {
                path: '/addpay',
                name: '支出信息',
                component: () => import('../views/addPay')
            }

        ]
    },


    {
        path: '/',
        name: '首页',
        component: () => import('../views/front/index'),
        redirect:'homepage'
    },
    {
        path: '/homepage',
        component: () => import('../views/front/index')
    },
    {
        path: '/homeRegister',
        component: () => import('../views/front/register')
    },
    {
        path: '/homeLogin',
        component: () => import('../views/front/login')
    },

    {
        path: '/header',
        name: '头部',
        component: () => import('../views/front/toubu'),
        children: [
            {
                path: '/newsinfo',
                name: '新闻动态',
                component: () => import('../views/front/newsInfo')
            },
            {
                path: '/boardinfo',
                name: '公告信息',
                component: () => import('../views/front/boardInfo')
            },
            {
                path: '/rescue',
                name: '应急救援',
                component: () => import('../views/front/rescue')
            },
            {
                path: '/help',
                name: '社会援助',
                component: () => import('../views/front/help')
            },
            {
                path: '/volist',
                name: '志愿者list',
                component: () => import('../views/front/volunteerlist')
            },
            {
                path: '/apply',
                name: '申请加入',
                component: () => import('../views/front/apply')
            },
            {
                path: '/receive',
                name: '接收',
                component: () => import('../views/front/receive')
            },
            {
                path: '/expand',
                name: '支出',
                component: () => import('../views/front/expand')
            },
            {
                path: '/donpass',
                name: '捐赠通道',
                component: () => import('../views/front/donpass')
            },
            {
                path: '/donquery',
                name: '捐赠查询',
                component: () => import('../views/front/donquery')
            },
            {
                path: '/boardcontent',
                name: '公告内容',
                component: () => import('../views/front/boardContent')
            },
            {
                path: '/newscontent',
                name: '新闻内容',
                component: () => import('../views/front/newsContent')
            },
            {
                path: '/rescuecontent',
                name: '救助内容',
                component: () => import('../views/front/rescueContent')
            },
            {
                path: '/donation',
                name: '捐款',
                component: () => import('../views/front/donation')
            },
            {
                path:'/person',
                name:'个人资料',
                component: ()=>import('../views/front/person')
            },
            {
                path:'/updateUser',
                name:'修改个人资料',
                component: ()=>import('../views/front/updateUser')
            }
        ]
    }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆

router.beforeEach((to, from, next) => {
    if ((to.path === '/homeLogin')||(to.path==='/homepage')||(to.path==='/homeRegister')||(to.path==='/newsinfo')
        ||(to.path==='/boardinfo')||(to.path==='/rescue')||(to.path==='/help')||(to.path==='/volist')
        ||(to.path==='/apply')||(to.path==='/receive')||(to.path==='/expand')||(to.path==='/donpass')
        ||(to.path==='/donquery')||(to.path==='/boardcontent')||(to.path==='/newscontent')||(to.path==='/rescuecontent')
        ||(to.path==='/')) {
        next();
    } else {
        let token = localStorage.getItem('token');

        if (token === null || token === '') {
            next('/homeLogin');
        } else {
            next();
        }
    }
   /* next(()=>{
        window.location.reload();
    })*/
    if (from.path=='/homeLogin'){
        next();
        window.location.reload();
    }

});

/*router.afterEach((to,from)=>{
    if (from.path=='/homepage'){
        window.location.reload();
    }
})*/


export default router
