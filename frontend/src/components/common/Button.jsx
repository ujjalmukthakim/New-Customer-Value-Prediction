export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "submit",
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`button button-${variant} ${className}`.trim()}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}