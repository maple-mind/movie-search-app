import { formatDate } from '@/lib/format';
import { getReviews } from "@/lib/review";
import { ReviewForm } from "./_components/review-form";

export default async function ReviewsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movieId = Number(id);
	const reviews = await getReviews(movieId);

	return (
		<div>
			<ReviewForm movieId={movieId} />

			{reviews.length === 0 ? (
				<p className="py-8 text-center text-sm text-gray-500">
					まだレビューはありません。
				</p>
			) : (
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
			)}
		</div>
	);
}