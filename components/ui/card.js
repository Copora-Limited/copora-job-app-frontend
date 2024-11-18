export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow rounded ${className}`}>{children}</div>
  );
}

export function CardHeader({ children }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

export function CardFooter({ children }) {
  return <div className="p-4 border-t">{children}</div>;
}
