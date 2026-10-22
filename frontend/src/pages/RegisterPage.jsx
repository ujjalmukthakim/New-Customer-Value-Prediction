import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Alert from "../components/common/Alert";
import RegistrationForm from "../components/forms/RegistrationForm";
import { useAuth } from "../hooks/useAuth";
import { registerRequest } from "../services/authService";

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const [notice, setNotice] = useState("");

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  async function handleRegistration(data) {
    return registerRequest(data);
  }

  return (
    <AuthLayout
      title="Create your account"
      description="Your account needs administrator approval before you can sign in."
      footer={<>Already registered? <Link to="/login">Sign in</Link></>}
    >
      {notice && <Alert variant="success">{notice}</Alert>}
      <RegistrationForm
        onRegister={handleRegistration}
        onRegistered={(result) => setNotice(result.message)}
      />
    </AuthLayout>
  );
}
