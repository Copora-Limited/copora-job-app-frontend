export function Input({ id, type = "text", placeholder, ...props }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded"
      {...props}
    />
  );
}
