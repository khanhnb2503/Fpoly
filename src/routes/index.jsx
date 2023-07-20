import { FaBlogger } from 'react-icons/fa';
import { IoIosAddCircle, IoMdBulb, IoMdHome } from 'react-icons/io';
import { NotFound } from '../components/layouts/NotFound/index.jsx';
import Lessons from '../components/shared/Lessons/index.jsx';
import Blog from "../views/app-views/blog/index.jsx";
import CoursePage from '../views/app-views/course/index.jsx';
import DetailCourse from '../views/app-views/detailCourse/index.jsx';
import Home from '../views/app-views/home/index.jsx';
import Login from '../views/auth-views/components/Login.jsx';
import Register from '../views/auth-views/components/Register.jsx';
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
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: '/blog', component: Blog },
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
