import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  async function handleLogin(credentials) {
    await signIn(credentials);
    navigate("/dashboard", { replace: true });
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