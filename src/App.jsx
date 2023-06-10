import { Route, Routes } from "react-router-dom";
import { RoutesConstant } from "./constants/routes";
import Login from './views/auth-views/components/Login';
import Register from './views/auth-views/components/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path={RoutesConstant.LOGIN} element={<Login />} />
        <Route path={RoutesConstant.REGISTER} element={<Register />} />
      </Routes>
    </>
  )
}

export default App
