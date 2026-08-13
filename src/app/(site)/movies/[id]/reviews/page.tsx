import { getReviews } from "@/lib/review";
import { ReviewForm } from "./_components/review-form";
import { ReviewList } from "./_components/review-list";

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
			<ReviewList reviews={reviews} movieId={movieId} />
		</div>
	);
}