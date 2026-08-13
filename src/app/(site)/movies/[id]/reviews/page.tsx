import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/format';

export default async function ReviewsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movieId = Number(id);

	const reviews = await prisma.review.findMany({
		where: { movieId },
		orderBy: { createdAt: 'desc' },
	});

	if (reviews.length === 0) {
		return (
			<p className="py-8 text-center text-sm text-gray-500">
				まだレビューはありません。
			</p>
		);
	}

	return (
		<ul className="space-y-4">
			{reviews.map((review) => (
				<li key={review.id} className="rounded-lg border border-gray-200 p-4">
					<div className="flex items-baseline justify-between gap-4">
						<p className="font-medium">{review.author}</p>
						<p className="text-sm text-gray-500">
							<span className="sr-only">評価</span>
							<span aria-hidden="true">{'★'.repeat(review.rating)}</span>
							<span className="ml-1">{review.rating} / 5</span>
						</p>
					</div>
					<p className="mt-2 whitespace-pre-wrap text-sm">{review.content}</p>
					<time
						dateTime={review.createdAt.toISOString()}
						className="mt-2 block text-xs text-gray-500"
					>
						{formatDate(review.createdAt)}
					</time>
				</li>
			))}
		</ul>
	);
}