import { FaBlogger } from 'react-icons/fa';
import { IoMdBulb, IoMdHome } from 'react-icons/io';
import { NotFound } from '../components/layouts/NotFound';
import { PaymentSuccess } from "../components/layouts/PaymentSuccess/index.jsx";
import Contact from '../components/shared/Contact';
import DetailPostForum from "../components/shared/DetailPostForum/index.jsx";
import Lessons from '../components/shared/Lessons';
import ListPosts from "../components/shared/ListPost/ListPost.jsx";
import Payment from '../views/app-views/Payment';
import Profile from '../views/app-views/Profile';
import ForumPage from "../views/app-views/blog/index.jsx";
import CoursePage from '../views/app-views/course';
import DetailCourse from '../views/app-views/detailCourse';
import Home from '../views/app-views/home';
import Login from '../views/auth-views/components/Login';
import Register from '../views/auth-views/components/Register';
import ListNotifications from "../components/shared/ListNotification/ListNotification.jsx";
import ListFeedback from "../components/shared/ListFeedbacks/ListFeedbacks.jsx";
import DetailFeedback from "../components/shared/DetailFeedback/DetailFeedback.jsx";
import ListVoucher from "../components/shared/ListVoucher/ListVoucher.jsx";
import ForgotPassword from "../views/auth-views/components/ForgotPassword.jsx";
// List routes
export const RoutesConstant = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOTPASSWORD: '/forgotPassword'
};

export const DefaultLayout = [
  { path: '/', component: Home },
  { path: '/courses', component: CoursePage },
  { path: '/courses/:id', component: DetailCourse },
  { path: '/lessons/:id', component: Lessons, layout: null },
  { path: '/profile', component: Profile, layout: null },
  { path: '/listVoucher', component: ListVoucher, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/forgotPassword", component: ForgotPassword, layout: null },
  { path: '/forum', component: ForumPage },
  { path: '/forum/detailPost/:id', component: DetailPostForum },
  { path: '/payment/:id', component: Payment },
  { path: '/paymentSuccess', component: PaymentSuccess },
  { path: '/forum/listPosts/:id', component: ListPosts },
  { path: '/forum/listNotifications', component: ListNotifications },
  { path: '/forum/listFeedbacks', component: ListFeedback },
  { path: '/forum/detailFeedback/:id', component: DetailFeedback },
  { path: '/contact', component: Contact },
  { path: "*", component: NotFound, layout: null },
]

export const RoutesList = [
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
