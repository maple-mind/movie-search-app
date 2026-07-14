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
		<section className="mt-6 rounded border border-gray-200 p-4">
			<h2 className="font-bold">AIによる紹介</h2>

			<button
				onClick={() => mutate()}
				disabled={isPending}
				className="mt-2 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-40"
			>
				{isPending ? "生成中..." : "AIに紹介文を書いてもらう"}
			</button>

			<div className="mt-3" aria-live="polite" aria-busy={isPending}>
				{isError && (
					<p role="alert">紹介文の生成に失敗しました。</p>
				)}
				{data && <p className="leading-relaxed">{data}</p>}
			</div>
		</section>
	);
}