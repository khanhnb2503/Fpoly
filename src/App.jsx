import { Fragment } from 'react';
import { Route, Routes } from "react-router-dom";
import LayoutPublic from './components/layouts';
import { DefaultLayout } from './routes';

function App() {
  return (
    <>
      <Routes>
        {DefaultLayout.map((route, index) => {
          const Page = route.component
          const Layout = route.layout === null ? Fragment : LayoutPublic
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