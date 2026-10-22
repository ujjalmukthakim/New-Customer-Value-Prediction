import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";

export default function DashboardLayout({ children }) {
  const { user, signOut } = useAuth();

  return (
    <main className="page-shell">
      <section className="dashboard-card">
        <header className="dashboard-header">
          <div>
            <p className="brand-name">VALUE CUSTOMER</p>
            <p className="brand-caption">Account overview</p>
          </div>
          <Button type="button" variant="secondary" onClick={signOut}>
            Sign out
          </Button>
        </header>

        <p className="status-label">SIGNED IN</p>
        <h1>Welcome</h1>
        <p className="intro-copy">Your account is ready to use.</p>

        <dl className="account-list">
          <div><dt>Email</dt><dd>{user.email}</dd></div>
          <div><dt>Role</dt><dd>{user.role}</dd></div>
          <div><dt>Branch ID</dt><dd>{user.brance ?? "Not assigned"}</dd></div>
        </dl>

        {children}
      </section>
    </main>
  );
}