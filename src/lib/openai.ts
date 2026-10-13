import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI();

export const recommendationSchema = z.object({
	introduction: z.string(),
	recommendedFor: z.array(z.string()),
});

export type Recommendation = z.infer<typeof recommendationSchema>;

export async function generateRecommendation(
	title: string,
	overview: string,
): Promise<Recommendation> {
	const response = await client.responses.parse({
		model: process.env.OPENAI_MODEL ?? "gpt-5.6-luna",
		instructions:
			"あなたは映画に詳しいコンシェルジュです。与えられた映画について、日本語で次の2つを書いてください。ネタバレは含めないでください。\n- introduction: どんな雰囲気の作品かが伝わる150文字程度の紹介文\n- recommendedFor: この作品をおすすめしたい人の特徴を3つ。それぞれ「〜な人」で終わる30文字以内の短い文",
		input: `タイトル: ${title}\nあらすじ: ${overview}`,
		text: { format: zodTextFormat(recommendationSchema, "recommendation") },
	});

	if (!response.output_parsed) {
		throw new Error("紹介文の生成結果を解析できませんでした");
	}

	return response.output_parsed;
}
