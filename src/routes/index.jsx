import { FaBlogger } from 'react-icons/fa';
import { IoIosAddCircle, IoMdBulb, IoMdHome } from 'react-icons/io';
import { NotFound } from '../components/layouts/NotFound';
import Lessons from '../components/shared/Lessons';
import Profile from '../views/app-views/Profile';
import Blog from "../views/app-views/blog";
import CoursePage from '../views/app-views/course';
import DetailCourse from '../views/app-views/detailCourse';
import Payment from '../views/app-views/Payment';
import Home from '../views/app-views/home';
import Login from '../views/auth-views/components/Login';
import Register from '../views/auth-views/components/Register';
// List routes
export const RoutesConstant = {
  LOGIN: '/login',
  REGISTER: '/register',
};

export const DefaultLayout = [
  { path: '/', component: Home },
  { path: '/courses', component: CoursePage },
  { path: '/courses/:id', component: DetailCourse },
  { path: '/lessons/:id', component: Lessons, layout: null },
  { path: '/profile', component: Profile, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: '/blog', component: Blog },
  { path: '/payment/:id', component: Payment },
  { path: "*", component: NotFound, layout: null },
]

export const RoutesList = [
  {
    id: 0,
    path: '',
    name: 'Viết bài',
    icon: <IoIosAddCircle size={50} color='#009DA6' />,
  },
  {
    id: 1,
    path: '/',
    name: 'Home',
    icon: <IoMdHome size={30} />
  },
  {
    id: 2,
    path: '/courses',
    name: 'Học',
    icon: <IoMdBulb size={30} />,
  },
  {
    id: 3,
    path: '/blog',
    name: 'Blog',
    icon: <FaBlogger size={24} />,
  }
]
