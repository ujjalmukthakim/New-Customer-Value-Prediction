export function getErrorMessage(error) {
  const responseData = error?.response?.data ?? error?.data;

  if (responseData && typeof responseData === "object") {
    return Object.entries(responseData)
      .map(([field, messages]) => {
        const text = Array.isArray(messages)
          ? messages.join(" ")
          : typeof messages === "object" && messages !== null
            ? JSON.stringify(messages)
            : String(messages);
        return field === "non_field_errors" ? text : `${field}: ${text}`;
      })
      .join(" ");
  }

  if (typeof responseData === "string") return responseData;

  return error?.message || "Something went wrong. Please try again.";
}
