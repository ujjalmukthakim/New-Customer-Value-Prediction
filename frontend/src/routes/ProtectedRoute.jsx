import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {dashboardByRole} from "../utils/roleDashboard"

export default function ProtectedRoute({allowedRoles}) {
  const { isAuthenticated,user } = useAuth();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if (allowedRoles && !allowedRoles.includes(user?.role)){
    return <Navigate to={dashboardByRole[user?.role]??"/login"} replace/>
  }
  return <Outlet/>

}