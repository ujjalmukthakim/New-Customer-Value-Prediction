import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { dashboardByRole } from "../utils/roleDashboard";

export default function LoginPage() {
  const { isAuthenticated, signIn,user } = useAuth();
  const navigate = useNavigate();


  if (isAuthenticated) return <Navigate to={dashboardByRole[user?.role]} replace />;

  async function handleLogin(credentials) {
    const result=await signIn(credentials);

    navigate(dashboardByRole[result.user.role]??"/login",{replace:true})
    // navigate("/dashboard", { replace: true });

    switch (user.role) {
      case "Employee":
        navigate("/employee/dashboard",{replace:true})
        
        break;
    
      default:
        navigate("/login",{replace:true})

    }
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      description="Enter your details to continue."
      footer={<>New to Value Customer? <Link to="/register">Create an account</Link></>}
    >
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  );
}