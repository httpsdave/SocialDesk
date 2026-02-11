import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostScheduling from "./pages/PostScheduling";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AddAccount from "./pages/AddAccount";
import Profile from "./pages/Profile";
import MainLayout from "./components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "schedule", Component: PostScheduling },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
      { path: "add-account", Component: AddAccount },
      { path: "profile", Component: Profile },
    ],
  },
]);