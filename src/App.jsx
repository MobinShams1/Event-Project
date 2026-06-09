import EventsIntroSection from "./components/Events/EventsIntroSection"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import Events from "./pages/Events";
function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <Navigate to='/event'/>
    },
    {
      path: '/event',
      element: <Events/>
    }
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
