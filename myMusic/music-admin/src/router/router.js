import Login from '../page/login';
import notFound from '../page/notFound';
import Home from '../page/home';

const router = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        auth: false
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        auth: true
    },
    {
        path: '/404',
        name: 'notFound',
        component: notFound,
        auth: false
    }
]

export default router;