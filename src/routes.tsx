import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostScheduling from "./pages/PostScheduling";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AddAccount from "./pages/AddAccount";
import Profile from "./pages/Profile";
import PlatformDetail from "./pages/PlatformDetail";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "schedule", Component: PostScheduling },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
      { path: "add-account", Component: AddAccount },
      { path: "profile", Component: Profile },
      { path: "platform/:platformId", Component: PlatformDetail },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);