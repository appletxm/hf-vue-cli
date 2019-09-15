/* global VueRouter */
const Home = () => import(/* webpackChunkName: "Home" */ 'pages/home')
const About = () => import(/* webpackChunkName: "Home" */ 'pages/about')
const ErrorPage = () => import(/* webpackChunkName: "Error" */ 'pages/error')

const routes = [
  { path: '/', component: Home },
  { path: '/#/', component: Home },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '*', component: ErrorPage }
]
const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  next()
})

export default router
