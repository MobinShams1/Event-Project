import {
  queryClient
} from "./api-http/http";
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Navigate } from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import Events from "./pages/Events";
import NewEvent from "./pages/NewEvent";
function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <Navigate to='/events' />
    },
    {
      path: '/events',
      element: <Events />,
      children: [
        {
          path: 'new',
          element: <NewEvent/>
        }
      ]
    }
  ]);

  return (<>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider ></>
  )
}

export default App
