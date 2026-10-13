import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { generateRecommendation } from "@/lib/openai";

const requestSchema = z.object({
	title: z.string().min(1),
	overview: z.string().trim().min(1),
});

export async function POST(request: NextRequest) {
	const body = await request.json();
	const parsed = requestSchema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json(
			{ error: "リクエストの形式が不正です" },
			{ status: 400 },
		);
	}

	try {
		const recommendation = await generateRecommendation(
			parsed.data.title,
			parsed.data.overview,
		);
		return NextResponse.json({ recommendation });
	} catch {
		return NextResponse.json(
			{ error: "紹介文の生成に失敗しました" },
			{ status: 500 },
		);
	}
}
