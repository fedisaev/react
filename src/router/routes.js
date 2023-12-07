import Posts from "../pages/Posts";
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: '/', element: <Posts/>},
    {path: '/posts', element: <Posts/>},
    {path: '/about', element: <About/>},
    {path: '/posts/:id', element: <PostIdPage/>},
    {path: '*', element: <ErrorPage/>},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>},
    {path: '/', element: <Login/>},
    {path: '*', element: <Login/>},
]