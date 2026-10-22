export function getErrorMessage(error) {
  if (error?.data && typeof error.data === "object") {
    return Object.entries(error.data)
      .map(([field, messages]) => {
        const text = Array.isArray(messages) ? messages.join(" ") : String(messages);
        return field === "non_field_errors" ? text : `${field}: ${text}`;
      })
      .join(" ");
  }

  return error?.message || "Something went wrong. Please try again.";
}