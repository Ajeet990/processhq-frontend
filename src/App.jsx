import Login from "./pages/auth/Login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./features/auth/PrivateRoute";
import AuthRoute from "./features/auth/AuthRoute";
import MasterLayout from "./layout/MasterLayout";
import Logout from "./pages/auth/Logout";
import Organizations from "./pages/organizations/Organizations";
import OrganizationForm from "./pages/organizations/components/OrganizationForm";
import Modules from "./pages/modules/Modules";

function App() {
  const authRoutes = [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> }
  ];

  // All admin related routes
  const privateRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/organizations", element: <Organizations /> },
    { path: "/organizations/add-new", element: <OrganizationForm /> },
	{ path:"/modules", element:<Modules />}
  ];

  return (
    <Routes>
      {authRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<AuthRoute>{route.element}</AuthRoute>}
        />
      ))}

      <Route path="/logout" element={<Logout />}></Route>

      <Route element={<MasterLayout />}>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PrivateRoute>{route.element}</PrivateRoute>}
          />
        ))}
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
