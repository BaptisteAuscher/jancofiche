import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root'
import CreerFiche from './routes/creer-fiche'
import Entrainement from './routes/Entrainement'
import Liste from './routes/Liste'
import Config from './routes/Config'
import Auth from './routes/Auth'
import './index.css'
import ErrorPage from './error-page'
import Accueil from './routes/Accueil'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

const token = cookies.get("TOKEN");

const ProtectedRoute = ({ children }) => {
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Accueil />,
      },
      {
        path: "/creer-fiche",
        element: <CreerFiche />
      },
      {
        path: "/entrainement",
        element: <Entrainement />
      },
      {
        path: "/liste",
        element: <Liste />
      },
      {
        path: "/config",
        element: (<ProtectedRoute>
                      <Config />
                  </ProtectedRoute>)
      },
      {
        path : "/auth",
        element : <Auth />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
