export function Textarea({ id, placeholder, className, ...props }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded ${className}`}
      {...props}
    />
  );
}
