"use client";

import { useMutation } from "@tanstack/react-query";

async function fetchRecommendation(
	title: string,
	overview: string,
): Promise<string> {
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
	title,
	overview,
}: {
	title: string;
	overview: string;
}) {
	const { mutate, data, isPending, isError } = useMutation({
		mutationFn: () => fetchRecommendation(title, overview),
	});

	return (
		<section className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
			<div className="flex items-center justify-between gap-4">
				<h2 className="font-bold text-gray-900">AIによる紹介</h2>

				<button
					onClick={() => mutate()}
					disabled={isPending}
					className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
				>
					{isPending ? "生成中..." : "AIに書いてもらう"}
				</button>
			</div>

			<div className="mt-4" aria-live="polite" aria-busy={isPending}>
				{isError && (
					<p role="alert" className="text-sm text-red-600">
						紹介文の生成に失敗しました。もう一度お試しください。
					</p>
				)}
				{data && <p className="leading-relaxed text-gray-700">{data}</p>}
			</div>
		</section>
	);
}
