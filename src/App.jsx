import { Route, Routes } from "react-router-dom";
import LayoutPublic from './components/layouts';
import { Defaulayout } from './routes';
import { Fragment } from 'react';

function App() {
  return (
    <>
        <Routes>
          {Defaulayout.map((route, index) => {
            const Page = route.component
            const Layout = route.layout === null ? Fragment  : LayoutPublic
            return <Route
              key={index}
              path={route.path}
              element={
              <Layout>
                <Page />
              </Layout>
            } />
          })}
        </Routes>
    </>
  )
}
export default App
