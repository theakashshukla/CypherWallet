import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <div>
            <h2>Welcome to the wallet</h2>
            <p>This is the main content area.</p>
          </div>
        ),
        // element: <Wallet />,
      },
      {
        path: "/transactions",
        element: (
          <div>
            <h2>Welcome to the trans</h2>
            <p>This is the main content area.</p>
          </div>
        ),
        // element: <Transactions />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
