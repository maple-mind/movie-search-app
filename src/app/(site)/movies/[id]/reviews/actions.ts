"use server";

import { revalidatePath } from "next/cache";
import { createReview } from "@/lib/review";

export type ReviewFormState =
	| { status: "idle" }
	| { status: "success" }
	| {
        status: "error";
        errors: Record<string, string[]>;
        values: { author: string; rating: string; content: string };
    };

export async function submitReview(
	_prevState: ReviewFormState,
	formData: FormData,
): Promise<ReviewFormState> {
	const movieId = Number(formData.get("movieId"));
	const author = String(formData.get("author") ?? "");
	const rating = String(formData.get("rating") ?? "");
	const content = String(formData.get("content") ?? "");

	const result = await createReview({
		movieId,
		author,
		rating: Number(rating),
		content,
	});

	if (!result.success) {
		return {
			status: "error",
			errors: result.errors,
			values: { author, rating, content },
		};
	}

	revalidatePath(`/movies/${movieId}/reviews`);

	return { status: "success" };
}