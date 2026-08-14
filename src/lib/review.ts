import { z } from "zod";
import { prisma } from "@/lib/prisma";

// ===== 入力スキーマ =====

const reviewInputSchema = z.object({
	movieId: z.number().int().positive(),
	author: z
		.string()
		.trim()
		.min(1, "お名前を入力してください")
		.max(20, "お名前は20文字以内で入力してください"),
	rating: z
		.number()
		.int()
		.min(1, "評価を選択してください")
		.max(5, "評価は5以下で入力してください"),
	content: z
		.string()
		.trim()
		.min(1, "レビュー本文を入力してください")
		.max(500, "レビューは500文字以内で入力してください"),
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;

// ===== 取得 =====

export async function getReviews(movieId: number) {
	return prisma.review.findMany({
		where: { movieId },
		orderBy: { createdAt: "desc" },
	});
}

// ===== 作成 =====

type CreateReviewResult =
	{ success: true } | { success: false; errors: Record<string, string[]> };

export async function createReview(
	input: unknown,
): Promise<CreateReviewResult> {
	const result = reviewInputSchema.safeParse(input);

	if (!result.success) {
		return {
			success: false,
			errors: z.flattenError(result.error).fieldErrors,
		};
	}

	await prisma.review.create({ data: result.data });

	return { success: true };
}

// ===== 削除 =====

export async function deleteReview(id: string): Promise<void> {
	await prisma.review.delete({ where: { id } });
}
