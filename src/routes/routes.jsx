import RootLayout from "../pages/RootLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NewPost from "../pages/NewPost";
import Posts from "../pages/Posts";
import SinglePost from "../pages/SinglePost";
import EditPost from "../pages/EditPost";
import AuthorRoute from "./AuthorRoute";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthorRoute>
            <Dashboard />
          </AuthorRoute>
        ),
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
        element: (
          <AuthorRoute>
            <NewPost />
          </AuthorRoute>
        ),
      },
      {
        path: "posts/",
        element: <Posts />,
      },
      {
        path: "posts/:id/edit",
        element: (
          <AuthorRoute>
            <EditPost />
          </AuthorRoute>
        ),
      },
      {
        path: "posts/:id/:slug",
        element: <SinglePost />,
      },
    ],
  },
];

export default routes;
