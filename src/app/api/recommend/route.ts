import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getMovie } from "@/lib/movie";
import { generateRecommendation } from "@/lib/openai";

// 任意の文章を OpenAI に渡せないよう、受け取るのは映画 ID のみとし、
// タイトルとあらすじはサーバー側で TMDB から取得する
const requestSchema = z.object({
	movieId: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
	const body = await request.json().catch(() => null);
	const parsed = requestSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "リクエストの形式が不正です" },
			{ status: 400 },
		);
	}

	try {
		const movie = await getMovie(String(parsed.data.movieId));

		if (!movie) {
			return NextResponse.json(
				{ error: "映画が見つかりません" },
				{ status: 404 },
			);
		}

		// あらすじがないと AI が内容を推測で書いてしまうため、生成させない
		if (!movie.overview.trim()) {
			return NextResponse.json(
				{ error: "あらすじが登録されていない作品です" },
				{ status: 422 },
			);
		}

		const recommendation = await generateRecommendation(
			movie.title,
			movie.overview,
		);
		return NextResponse.json({ recommendation });
	} catch {
		return NextResponse.json(
			{ error: "紹介文の生成に失敗しました" },
			{ status: 500 },
		);
	}
}
