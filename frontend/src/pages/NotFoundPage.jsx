import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="page-shell">
      <section className="auth-card">
        <p className="status-label">404</p>
        <h1>Page not found</h1>
        <p className="intro-copy">The page you requested does not exist.</p>
        <Link to="/login">Return to sign in</Link>
      </section>
    </main>
  );
}