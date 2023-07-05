import { FaBlogger } from 'react-icons/fa';
import { IoIosAddCircle, IoMdBulb, IoMdHome } from 'react-icons/io';
import Login from '../views/auth-views/components/Login.jsx';
import Home from '../views/app-views/home/index.jsx';
import CoursePage from '../views/app-views/course/index.jsx';
import DetailCourse from '../views/app-views/detailCourse/index.jsx';
import Lessons from '../components/shared/Lessons/index.jsx';
import { NotFound } from '../components/layouts/NotFound/index.jsx';
import Register from '../views/auth-views/components/Register.jsx';

// List routes
export const RoutesConstant = {
  LOGIN: '/login',
  REGISTER: '/register',
};

export const Defaulayout = [
  {path :'/', component: Home},
  {path :'khoa_hoc', component: CoursePage},
  {path :'/thong-tin-khoa-hoc', component: DetailCourse},
  {path :'/lessons', component: Lessons},
  {path: "/login", component: Login, layout: null },
  {path: "/register", component: Register, layout: null },
  {path: "*", component: NotFound, layout: null}
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
    path: '',
    name: 'Home',
    icon: <IoMdHome size={30} />
  },
  {
    id: 2,
    path: 'khoa-hoc',
    name: 'Học',
    icon: <IoMdBulb size={30} />,
  },
  {
    id: 3,
    path: '',
    name: 'Blog',
    icon: <FaBlogger size={24} />,
  }
]