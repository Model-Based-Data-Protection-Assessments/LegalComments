import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '@/views/TableView.vue'
import CommentView from '@/views/CommentView.vue'
import DevView from '@/views/DevView.vue'
import AddView from '@/views/AddView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/table',
      name: 'Table',
      component: TableView
    },
    {
      path: '/comment/:id',
      name: 'Comment',
      component: CommentView,
      props: true
    },
    {
      path: '/dev',
      name: 'Dev',
      component: DevView
    },
    {
      path: '/new',
      name: 'New',
      component: AddView
    }
  ]
})

export { router }
