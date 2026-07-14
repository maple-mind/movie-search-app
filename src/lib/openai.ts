import OpenAI from "openai";

const client = new OpenAI();

export async function generateRecommendation(
	title: string,
	overview: string,
): Promise<string> {
	const response = await client.responses.create({
		model: process.env.OPENAI_MODEL ?? "gpt-5.6-luna",
		instructions:
			"あなたは映画に詳しいコンシェルジュです。与えられた映画について、日本語で200文字程度の紹介文を書いてください。「どんな人におすすめか」と「どんな雰囲気の作品か」に触れてください。ネタバレは含めないでください。",
		input: `タイトル: ${title}\nあらすじ: ${overview}`,
	});

	return response.output_text;
}