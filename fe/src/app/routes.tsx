import { createBrowserRouter } from "react-router";
import Layout from "./layout/Layout";
import { Home } from "./pages/Home";
import { Presentation } from "./pages/Presentation";
import { Articles } from "./pages/Articles";
import { ArticleDetail } from "./pages/ArticleDetail";
import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "presentation",
        Component: Presentation,
      },
      {
        path: "articles",
        Component: Articles,
      },
      {
        path: "articles/:id",
        Component: ArticleDetail,
      },
      {
        path: "contact", 
        Component: Presentation, 
      },
      {
        path: "*",
        Component: NotFound,
      }
    ],
  },
  {
    path: "/admin",
    children: [
      {
        index: true,
        Component: Dashboard, 
      },
      {
        path: "login",
        Component: Login,
      }
    ]
  }
]);
