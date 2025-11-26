import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Main from './components/Main.jsx'
import Contact from './components/Contact.jsx'
import MyGrids from './components/MyGrids.jsx'
import GridView from './components/GridView.jsx'
import Templates from './components/Templates.jsx'
import Support from './components/Support.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/dashboard/grids',
        element: <MyGrids />,
      },
      {
        path: '/dashboard/grids/1',
        element: <GridView />,
      },
      {
        path: '/dashboard/templates',
        element: <Templates />,
      },
      {
        path: '/dashboard/support',
        element: <Support />,
      },
    ],
  },
  // {
  //   path: '/dashboard/settings',
  //   element: <Settings />,
  // },
  //
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
