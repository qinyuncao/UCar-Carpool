import "./styles.css"

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Preference from './components/Preference/Preference.jsx';
import Landing from './components/Landing/Landing.jsx'

function App(){
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "preference",
          element: <Preference />,
        }
      ],
    },
  ]);

  return <RouterProvider router={router}/>
}

export default App;