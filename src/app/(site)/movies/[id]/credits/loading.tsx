export default function Loading() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );
}
