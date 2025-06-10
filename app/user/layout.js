export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full p-4 flex flex-col gap-4 bg-zinc-200">
      {children}
    </div>
  );
}
