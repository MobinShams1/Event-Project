import {
  queryClient
} from "./api-http/http";
import { lazy, Suspense } from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Navigate } from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loader as editEventLoader,
  action as editEventAction
} from "./pages/EditEvent";
import { setUserFromStorage } from "./redux/authSlice";
import LoadingIndicator from "./components/LoadingIndicator";
function App() {


  const Events = lazy(() => import("./pages/Events"));
  const NewEvent = lazy(() => import("./pages/NewEvent"));
  const LoginPage = lazy(() => import("./pages/LoginPage"));
  const SignupPage = lazy(() => import("./pages/SignupPage"));
  const EventDetails = lazy(() => import("./pages/EventDetails"));
  const EditEvent = lazy(() => import("./pages/EditEvent"));

  function LoadingFallback() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        <div>
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }



  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/events" replace />,
    },
    {
      path: '/login',

      element: (
        <Suspense fallback={<LoadingFallback />}>
          <LoginPage /></Suspense>
      )
    },
    {
      path: '/signup',
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <SignupPage /></Suspense>
      )
    },
    {
      path: '/events',
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <Events /></Suspense>
      ),

      children: [
        {
          path: '/events/new',
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <NewEvent /></Suspense>
          ),
        },
      ],
    },
    {
      path: '/events/:id',
      element: (<Suspense fallback={<LoadingFallback />}><EventDetails /></Suspense>),
      children: [
        {
          path: '/events/:id/edit',
          element: (

            <EditEvent />
          ),
          loader: editEventLoader,
          action: editEventAction
        },
      ],
    },
  ],
    {
      basename: "/Event-Project"
    }
  );

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  if (user) {
    console.log(user.firstName);
  } else {
    console.log("user not found");
  }
  useEffect(() => {

    dispatch(setUserFromStorage());
  }, [dispatch]);


  return (<>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider ></>
  )
}

export default App
