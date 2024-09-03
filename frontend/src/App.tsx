import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Job from "./components/MultiJob";
import BrowseJobs from "./components/BrowseJobs";
import Profile from "./components/Profile";
import JobDiscription from "./components/JobDiscription";
import Companies from "./components/Companies";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/jobs",
      element: <Job />,
    },
    {
      path: "/description/:id",
      element: <JobDiscription />,
    },
    {
      path: "/browsejob",
      element: <BrowseJobs />,
    },
    {
      path: "/profile/update",
      element: <Profile />,
    },

    //  admin auth

    {
      path: "/companies",
      element: <Companies />,
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
