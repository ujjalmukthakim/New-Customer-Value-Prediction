export default function AuthLayout({ title, description, children, footer }) {
  return (
    <main className="page-shell">
      <section className="auth-card">
        <header className="brand">
          <div className="brand-logo" aria-hidden="true">VC</div>
          <div>
            <p className="brand-name">VALUE CUSTOMER</p>
            <p className="brand-caption">Customer value management</p>
          </div>
        </header>

        <div className="page-heading">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        {children}
        <div className="auth-footer">{footer}</div>
      </section>

      <p className="copyright">© {new Date().getFullYear()} Value Customer</p>
    </main>
  );
}