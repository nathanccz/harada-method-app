import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Main from './components/Main.jsx'
import MyGrids from './components/MyGrids.jsx'
import GridView from './components/GridView.jsx'
import Templates from './components/Templates.jsx'
import Support from './components/Support.jsx'
import ModalProvider from './providers/ModalProvider.jsx'
import AuthContextProvider from './providers/AuthContextProvider.jsx'
import ToastProvider from './providers/ToastProvider.jsx'
import DataProvider from './providers/DataProvider.jsx'
import Completed from './components/Completed.jsx'
import PDFView from './pages/PDFView.jsx'

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
        path: '/dashboard/grid/:id',
        element: <GridView />,
      },
      {
        path: '/dashboard/pdf/:id',
        element: <PDFView />,
      },
      {
        path: '/dashboard/completed',
        element: <Completed />,
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
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DataProvider>
        <ToastProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </ToastProvider>
      </DataProvider>
    </AuthContextProvider>
  </StrictMode>
)
