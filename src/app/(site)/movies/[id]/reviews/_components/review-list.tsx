"use client";

import { useOptimistic } from "react";
import { removeReview } from "../actions";
import { formatDate } from "@/lib/format";

type Review = {
	id: string;
	author: string;
	rating: number;
	content: string;
	createdAt: Date;
};

export function ReviewList({
	reviews,
	movieId,
}: {
	reviews: Review[];
	movieId: number;
}) {
	const [optimisticReviews, removeOptimistic] = useOptimistic(
		reviews,
		(current: Review[], removedId: string) =>
			current.filter((review) => review.id !== removedId),
	);

	if (optimisticReviews.length === 0) {
		return (
			<p className="py-8 text-center text-sm text-gray-500">
				まだレビューはありません。
			</p>
		);
	}

	return (
		<ul className="space-y-4">
			{optimisticReviews.map((review) => (
				<li key={review.id} className="rounded-lg border border-gray-200 p-4">
					<div className="flex items-baseline justify-between gap-4">
						<p className="font-medium">{review.author}</p>
						<p className="text-sm text-gray-500">
							<span className="sr-only">評価</span>
							<span aria-hidden="true">{"★".repeat(review.rating)}</span>
							<span className="ml-1">{review.rating} / 5</span>
						</p>
					</div>
					<p className="mt-2 text-sm whitespace-pre-wrap">{review.content}</p>
					<div className="mt-2 flex items-center justify-between">
						<time
							dateTime={review.createdAt.toISOString()}
							className="text-xs text-gray-500"
						>
							{formatDate(review.createdAt)}
						</time>
						<form
							action={async (formData) => {
								removeOptimistic(review.id);
								await removeReview(formData);
							}}
						>
							<input type="hidden" name="id" value={review.id} />
							<input type="hidden" name="movieId" value={movieId} />
							<button
								type="submit"
								className="text-xs text-red-600 hover:underline"
							>
								削除
							</button>
						</form>
					</div>
				</li>
			))}
		</ul>
	);
}
