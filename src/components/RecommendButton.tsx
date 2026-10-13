"use client";

import { useQuery } from "@tanstack/react-query";
import type { Recommendation } from "@/lib/openai";

async function fetchRecommendation(
	title: string,
	overview: string,
): Promise<Recommendation> {
	const res = await fetch("/api/recommend", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ title, overview }),
	});

	if (!res.ok) {
		throw new Error("紹介文の生成に失敗しました");
	}

	const data = await res.json();
	return data.recommendation;
}

export default function RecommendButton({
	movieId,
	title,
	overview,
}: {
	movieId: number;
	title: string;
	overview: string;
}) {
	// タブ移動でアンマウントされても結果を残すため、Query のキャッシュに保持する。
	// 従量課金のため自動取得はせず、ボタン押下時の refetch でのみ生成する。
	const { refetch, data, isFetching, isError } = useQuery({
		queryKey: ["recommendation", movieId],
		queryFn: () => fetchRecommendation(title, overview),
		enabled: false,
		retry: false,
		gcTime: 30 * 60 * 1000,
	});

	// あらすじがないと AI が内容を推測で書いてしまうため、生成させない
	if (!overview.trim()) {
		return (
			<section className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
				<h2 className="font-bold text-gray-900">AIおすすめ紹介</h2>
				<p className="mt-4 text-sm text-gray-500">
					この作品はあらすじが登録されていないため、AIによる紹介を利用できません。
				</p>
			</section>
		);
	}

	return (
		<section className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-bold text-gray-900">AIおすすめ紹介</h2>

				<button
					onClick={() => refetch()}
					disabled={isFetching}
					className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
				>
					{isFetching ? "生成中..." : data ? "もう一度生成" : "紹介文を生成"}
				</button>
			</div>

			<div className="mt-4" aria-live="polite" aria-busy={isFetching}>
				{isError && (
					<p role="alert" className="text-sm text-red-600">
						紹介文の生成に失敗しました。もう一度お試しください。
					</p>
				)}
				{data ? (
					<>
						<p className="leading-relaxed text-gray-700">{data.introduction}</p>
						<h3 className="mt-4 text-sm font-bold text-gray-900">
							こんな人におすすめ
						</h3>
						<ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
							{data.recommendedFor.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</>
				) : (
					!isError && (
						<p className="text-sm text-gray-500">
							AIがこの作品のおすすめポイントを紹介します。
						</p>
					)
				)}
			</div>
		</section>
	);
}
