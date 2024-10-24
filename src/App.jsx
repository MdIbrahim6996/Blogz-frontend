import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import RootLayout from "./components/Layout/RootLayout";
import PostDetail from "./pages/PostDetail/PostDetail";
import AuthLayout from "./components/Layout/AuthLayout";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Profile from "./pages/Profile/Profile";
import UploadPhoto from "./pages/Users/UploadPhoto/UploadPhoto";
import UploadProfile from "./pages/Users/UpdateProfile/UpdateProfile";
import AccountVerificationConfirmation from "./pages/Auth/AccountVerificationConfirmation/AccountVerificationConfirmation";
import Category from "./pages/Admin/Category/Category";
import Posts from "./pages/Posts/Posts";
import CreatePost from "./pages/Users/CreatePost/CreatePost";
import AllUsers from "./pages/AllUsers/AllUsers";
import AllUsersAdmin from "./pages/Admin/AllUsersAdmin/AllUsersAdmin";
import AdminLayout from "./components/Layout/AdminLayout";
import UserDetails from "./pages/Users/UserDetails/UserDetails";
import Categories from "./pages/Categories/Categories";
import UpdatePost from "./pages/Users/UpdatePost/UpdatePost";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
      },
      {
        path: "post/update/:id",
        element: <UpdatePost />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword/>,
      },
      {
        path: "verify-account/:token",
        element: <AccountVerificationConfirmation />,
      },
    ],
  },
  {
    path: "/user",
    element: <RootLayout />,
    children: [
      {
        path: ":id",
        element: <UserDetails />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },

      {
        path: "all",
        element: <AllUsers />,
      },
      
      {
        path: "upload-photo/profile/:id",
        element: <UploadPhoto />,
      },
      {
        path: "update-profile/:id",
        element: <UploadProfile />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "add-category",
        element: <Category />,
      },
      {
        path: "all-users",
        element: <AllUsersAdmin />,
      },
      
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
