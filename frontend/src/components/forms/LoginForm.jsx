import { useState } from "react";
import Button from "../common/Button";
import { getErrorMessage } from "../../utils/errorMessage";

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(form);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="alert alert-error" role="alert">{error}</div>}

      <label className="field">
        <span>Email address</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={updateField}
          required
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={form.password}
          onChange={updateField}
          required
        />
      </label>

      <Button disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}