import { createRouter, createWebHistory } from 'vue-router'

/**
 * 控制路由跳转的函数 next函数
 *
 * 调用方式：
 * 1. next() - 正常放行，进入to路由
 * 2. next(false) - 中断当前导航
 * 3. next(path) - 重定向到指定路径
 * 4. next(error) - 传递错误对象，终止导航并触发错误
 *
 * 注意：在Vue Router 4+中，更推荐使用返回值方式而非显式调用next
 */

/**
 * 即将要进入的目标路由对象 to参数
 *
 * 常用属性：
 * - path: 路由路径 (如 '/dashboard')
 * - name: 路由名称 (如 'Dashboard')
 * - params: 动态路由参数 (如 { id: '123' })
 * - query: URL查询参数 (如 ?search=vue 解析为 { search: 'vue' })
 * - meta: 路由元信息 (开发者自定义的数据)
 * - fullPath: 完整URL路径 (包含查询参数和hash)
 * - matched: 匹配的路由记录数组 (包含嵌套路由关系)
 */

/**
 * 当前导航正要离开的路由对象 from 参数
 *
 * 包含与to对象相同的属性，表示离开前的路由状态
 *
 * 典型用途：
 * - 记录用户来源页面
 * - 比较前后路由差异
 * - 实现页面访问统计
 */


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Page',
      component: () => import('../view/StudentPage.vue')
    },
    {
      path: '/pageMain',
      name: 'Page',
      component: () => import('../view/PageMain.vue')
    }

  ]
})


function validateToken(token:any) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) // 解析JWT payload
    const expiresAt = payload.exp * 1000 // 转换为毫秒
    return Date.now() < expiresAt
  } catch (e) {
    router.push("/")
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  // 1. 定义公开路径
  const publicPaths = ['/', '/login']



  // 2. 获取token
  const token = localStorage.getItem('accessToken')

  // 3. 如果是首次加载应用(刷新或关闭后重新打开)
  if (from.name === undefined && token) {
    // 验证token有效性
    const isValid = await validateToken(token)
    if (isValid) {
      // token有效，直接进入主页
      if (to.path === '/') {
        return next('/pageMain')
      }
      return next() // 其他路由正常放行
    } else {
      // token无效，清除并跳转登录页
      localStorage.removeItem('accessToken')
      return next('/')
    }
  }

  // 4. 正常导航逻辑
  if (publicPaths.includes(to.path)) {
    // 公开路径直接放行
    return next()
  }

  // 5. 需要认证的路径
  if (!token) {
    // 无token，重定向到登录页
    return next('/')
  }

  // 6. 验证token有效性
  try {
    const isValid = await validateToken(token)
    if (isValid) {
      next() // token有效，放行
    } else {
      localStorage.removeItem('accessToken')
      next('/')
    }
  } catch (error) {
    localStorage.removeItem('accessToken')
    next('/')
  }
})


export default router
