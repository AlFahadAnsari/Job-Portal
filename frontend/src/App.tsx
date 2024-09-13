import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Job from "./components/MultiJob";
import BrowseJobs from "./components/BrowseJobs";
import Profile from "./components/Profile";
import JobDiscription from "./components/JobDiscription";
import Companies from "./admin/Companies";
import CompaniesCreate from "./admin/CompaniesCreate";
import CompanyById from "./admin/CompanyById";
import AdminJob from "./admin/AdminJob";
import PostAdminJob from "./admin/PostAdminJob";
import Applicants from "./admin/Applicants";

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
      path: "/admin/companies",
      element: <Companies />,
    },
    {
      path: "/admin/companies/create",
      element: <CompaniesCreate />,
    },

    {
      path: "/admin/companies/:id",
      element: <CompanyById />,
    },
    {
      path: "/admin/companies/jobs",
      element: <AdminJob />,
    },
    {
      path: "/admin/jobs/create",
      element: <PostAdminJob />,
    },
    {
      path:"/admin/jobs/:id/applicants",
      element:<Applicants/>
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
