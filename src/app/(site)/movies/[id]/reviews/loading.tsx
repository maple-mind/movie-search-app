export default function Loading() {
	return (
		<ul className="space-y-4">
			{Array.from({ length: 3 }).map((_, i) => (
				<li key={i} className="rounded-lg border border-gray-200 p-4">
					<div className="flex items-baseline justify-between gap-4">
						<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
						<div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
					</div>
					<div className="mt-3 h-3 w-full animate-pulse rounded bg-gray-200" />
					<div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-gray-200" />
					<div className="mt-3 h-2.5 w-20 animate-pulse rounded bg-gray-200" />
				</li>
			))}
		</ul>
	);
}