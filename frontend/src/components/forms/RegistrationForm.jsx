import { useState } from "react";
import Button from "../common/Button";
import { getErrorMessage } from "../../utils/errorMessage";

const initialForm = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  address: "",
  role: "Employee",
  brance: "",
};

export default function RegistrationForm({ onRegister, onRegistered }) {
  const [form, setForm] = useState(initialForm);
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
      const result = await onRegister({
        ...form,
        brance: Number(form.brance),
      });
      setForm(initialForm);
      onRegistered?.(result);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="alert alert-error" role="alert">{error}</div>}

      <div className="form-grid">
        <label className="field">
          <span>First name</span>
          <input name="first_name" autoComplete="given-name" value={form.first_name} onChange={updateField} required />
        </label>
        <label className="field">
          <span>Last name</span>
          <input name="last_name" autoComplete="family-name" value={form.last_name} onChange={updateField} required />
        </label>
      </div>

      <label className="field">
        <span>Email address</span>
        <input type="email" name="email" autoComplete="email" value={form.email} onChange={updateField} required />
      </label>

      <label className="field">
        <span>Password</span>
        <input type="password" name="password" autoComplete="new-password" minLength={8} value={form.password} onChange={updateField} required />
        <small>Use at least 8 characters.</small>
      </label>

      <div className="form-grid">
        <label className="field">
          <span>Phone number</span>
          <input type="tel" name="phone_number" autoComplete="tel" value={form.phone_number} onChange={updateField} />
        </label>
        <label className="field">
          <span>Role</span>
          <select name="role" value={form.role} onChange={updateField} required>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Branch ID</span>
        <input type="number" name="brance" min="1" value={form.brance} onChange={updateField} required />
        <small>Enter the ID of an active branch provided by your administrator.</small>
      </label>

      <label className="field">
        <span>Address</span>
        <textarea name="address" rows="3" autoComplete="street-address" value={form.address} onChange={updateField} />
      </label>

      <Button disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
