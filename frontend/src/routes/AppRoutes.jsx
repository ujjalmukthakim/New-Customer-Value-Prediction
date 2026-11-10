import { Navigate, Route, Router, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
// import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import EmployeeDashboardPage from "../pages/EmployeeDashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route> */}

        {/* Employee Routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["Employee"]}/>}
        >
          <Route
            path="/employee/dashboard"
            element={<EmployeeDashboardPage/>}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Customer"]}/>}>
        <Route
        path="/customer/dashboard"
        // element={}
        />

        </Route>




      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}