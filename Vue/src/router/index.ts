import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name:"Ai",
      component:() => import("@/view/ai/index.vue")
    }
  ],
})

export default router
