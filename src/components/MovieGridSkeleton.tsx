export default function MovieGridSkeleton({ count }: { count: number }) {
	return (
		<ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
			{Array.from({ length: count }).map((_, i) => (
				<li key={i}>
					<div className="flex aspect-2/3 w-full animate-pulse rounded bg-gray-100" />
					<div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200"></div>
				</li>
			))}
		</ul>
	);
}
