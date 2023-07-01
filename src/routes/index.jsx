import { FaBlogger } from 'react-icons/fa';
import { IoIosAddCircle, IoMdBulb, IoMdHome } from 'react-icons/io';

// List routes
export const RoutesConstant = {
  LOGIN: '/login',
  REGISTER: '/register'
};

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