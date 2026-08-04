import RootLayout from "../pages/RootLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NewPost from "../pages/NewPost";
import Posts from "../pages/Posts";
import SinglePost from "../pages/SinglePost";
import EditPost from "../pages/EditPost";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users/login",
        element: <Login />,
      },
      {
        path: "users/register",
        element: <Register />,
      },
      {
        path: "posts/new-post",
        element: <NewPost />,
      },
      {
        path: "posts/",
        element: <Posts />,
      },
      {
        path: "posts/:id/edit",
        element: <EditPost />,
      },
      {
        path: "posts/:id/:slug",
        element: <SinglePost />,
      },
    ],
  },
];

export default routes;
