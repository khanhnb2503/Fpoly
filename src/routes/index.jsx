import { FaBlogger } from 'react-icons/fa';
import { IoIosAddCircle, IoMdBulb, IoMdHome } from 'react-icons/io';
import { NotFound } from '../components/layouts/NotFound';
import Lessons from '../components/shared/Lessons';
import Profile from '../views/app-views/Profile';
import CoursePage from '../views/app-views/course';
import DetailCourse from '../views/app-views/detailCourse';
import Payment from '../views/app-views/Payment';
import Home from '../views/app-views/home';
import Login from '../views/auth-views/components/Login';
import Register from '../views/auth-views/components/Register';
import {PaymentSuccess} from "../components/layouts/PaymentSuccess/index.jsx";
import ForumPage from "../views/app-views/blog/index.jsx";
import DetailPostForum from "../components/shared/DetailPostForum/index.jsx";
import ListPost from "../components/shared/ListPost/ListPost.jsx";
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
  { path: '/forum', component: ForumPage },
  { path: '/forum/detailPost/:id', component: DetailPostForum },
  { path: '/payment/:id', component: Payment },
  { path: '/paymentSuccess', component: PaymentSuccess },
  { path: '/listPosts/:id', component: ListPost },
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
    path: '/forum',
    name: 'Forum',
    icon: <FaBlogger size={24} />,
  }
]
