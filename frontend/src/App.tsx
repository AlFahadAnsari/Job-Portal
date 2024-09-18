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
import Protected from "./admin/Protected";

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
      element: (
        <Protected>
          <Companies />
        </Protected>
      ),
    },
    {
      path: "/admin/companies/create",
      element: (
        <Protected>
          <CompaniesCreate />,
        </Protected>
      ),
    },

    {
      path: "/admin/companies/:id",
      element: (
        <Protected>
          <CompanyById />,
        </Protected>
      ),
    },
    {
      path: "/admin/companies/jobs",
      element: (
        <Protected>
          <AdminJob />,
        </Protected>
      ),
    },
    {
      path: "/admin/jobs/create",
      element: (
        <Protected>
          <PostAdminJob />,
        </Protected>
      ),
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: (
        <Protected>
          <Applicants />,
        </Protected>
      ),
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
