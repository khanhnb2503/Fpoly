import { Route, Routes } from "react-router-dom";
import Lessons from "./components/shared/Lessons";
import { RoutesConstant } from "./routes";
import Login from './views/auth-views/components/Login';
import Register from './views/auth-views/components/Register';
import DetailCoursePage from './views/app-views/detailCourse/index.jsx';

function App() {
  return (
    <>
      {/* <LayoutPublic>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/khoa-hoc' element={<CoursePage />} />
          <Route path='/thong-tin-khoa-hoc' element={ <DetailCoursePage />} />
        </Routes>
      </LayoutPublic> */}
      <Routes>
        <Route path='/lessons' element={<Lessons />} />
        <Route path={RoutesConstant.LOGIN} element={<Login />} />
        <Route path={RoutesConstant.REGISTER} element={<Register />} />
      </Routes>
    </>
  )
}
export default App
