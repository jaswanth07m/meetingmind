export default function LoadingSpinner({ message = 'Processing...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="spinner" />
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
}