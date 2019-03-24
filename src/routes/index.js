import Home from './home'
import About from './about'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/latest',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  }
]

export default routes