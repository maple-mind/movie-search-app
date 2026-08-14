"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import type { MovieSummary, SearchResult } from "@/lib/movie";
import { useDebounce } from "@/hooks/useDebounce";

async function fetchSearch(query: string, page: number): Promise<SearchResult> {
	const res = await fetch(
		`/api/search?query=${encodeURIComponent(query)}&page=${page}`,
	);
	if (!res.ok) {
		throw new Error("検索に失敗しました");
	}
	return res.json();
}

export default function MovieSearch() {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 500);
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, isPlaceholderData } = useQuery({
		queryKey: ["search", debouncedQuery, page],
		queryFn: () => fetchSearch(debouncedQuery, page),
		enabled: debouncedQuery.length > 0,
		placeholderData: keepPreviousData,
	});

	return (
		<div>
			<input
				type="text"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setPage(1);
				}}
				placeholder="映画タイトルを入力"
				aria-label="映画を検索"
				className="w-full rounded border border-gray-300 px-3 py-2"
			/>

			<div className="mt-4" aria-live="polite" aria-busy={isLoading}>
				{isLoading && <p>検索中...</p>}
				{isError && <p role="alert">検索に失敗しました。</p>}

				{debouncedQuery.length > 0 &&
					data &&
					data.results.length === 0 &&
					!isLoading && <p>該当する映画が見つかりませんでした。</p>}

				{debouncedQuery.length > 0 && data && data.results.length > 0 && (
					<>
						<ul className="space-y-3">
							{data.results.map((movie) => (
								<li key={movie.id}>
									<Link
										href={`/movies/${movie.id}`}
										className="flex items-center gap-3 rounded p-2 hover:bg-gray-50"
									>
										{movie.poster_path ? (
											<Image
												src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
												alt={`${movie.title}のポスター`}
												width={60}
												height={90}
												className="h-auto rounded"
											/>
										) : (
											<div className="flex h-[90px] w-[60px] items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
												No Image
											</div>
										)}
										<span className="text-blue-600 underline">
											{movie.title}
										</span>
									</Link>
								</li>
							))}
						</ul>

						<div className="mt-4 flex items-center justify-center gap-4">
							<button
								onClick={() => setPage((p) => Math.max(p - 1, 1))}
								disabled={page <= 1}
								className="rounded border px-3 py-1 disabled:opacity-40"
							>
								前へ
							</button>
							<span>
								{page} / {data.totalPages}
							</span>
							<button
								onClick={() => setPage((p) => p + 1)}
								disabled={isPlaceholderData || page >= data.totalPages}
								className="rounded border px-3 py-1 disabled:opacity-40"
							>
								次へ
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
