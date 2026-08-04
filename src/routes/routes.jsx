import RootLayout from "../pages/RootLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NewPost from "../pages/NewPost";
import EditPost from "../pages/EditPost";
import AuthorRoute from "../components/auth/AuthorRoute";

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
        path: "posts/new-post",
        element: (
          <AuthorRoute>
            <NewPost />
          </AuthorRoute>
        ),
      },
      {
        path: "posts/:id/edit",
        element: (
          <AuthorRoute>
            <EditPost />
          </AuthorRoute>
        ),
      },
    ],
  },
];

export default routes;
