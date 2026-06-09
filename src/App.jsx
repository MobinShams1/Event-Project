import {
  queryClient
} from "./api-http/http";
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Navigate } from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import Events from "./pages/Events";
import NewEvent from "./pages/NewEvent";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EventDetails from "./pages/EventDetails";
import {
  EditEvent,
  loader as editEventLoader,
  action as editEventAction
} from "./pages/EditEvent";
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/events" />,
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/signup',
      element: <SignupPage />
    },
    {
      path: '/events',
      element: <Events />,

      children: [
        {
          path: '/events/new',
          element: <NewEvent />,
        },
      ],
    },
    {
      path: '/events/:id',
      element: <EventDetails />,
      children: [
        {
          path: '/events/:id/edit',
          element: <EditEvent />,
          loader: editEventLoader,
          action: editEventAction
        },
      ],
    },
  ]);

  return (<>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider ></>
  )
}

export default App
