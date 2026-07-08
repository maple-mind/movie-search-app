"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { MovieSummary } from "@/lib/movie";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

async function fetchSearch(query: string): Promise<MovieSummary[]> {
	const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
	if (!res.ok) {
		throw new Error("検索に失敗しました");
	}
	const data = await res.json();
	return data.results;
}

export default function MovieSearch() {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 500);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["search", debouncedQuery],
		queryFn: () => fetchSearch(query),
		enabled: query.length > 0,
	});

	return (
		<div>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="映画タイトルを入力"
				aria-label="映画を検索"
				className="w-full rounded border border-gray-300 px-3 py-2"
			/>

			<div className="mt-4" aria-live="polite" aria-busy={isLoading}>
				{isLoading && <p>検索中...</p>}
				{isError && <p role="alert">検索に失敗しました。</p>}
				{data && data.length === 0 && (
					<p>該当する映画が見つかりませんでした。</p>
				)}
				{data && data.length > 0 && (
					<ul className="space-y-3">
						{data.map((movie) => (
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
											className="rounded"
										/>
									) : (
										<div className="flex h-[90px] w-[60px] items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
											No Image
										</div>
									)}
									<span className="text-blue-600 underline">{movie.title}</span>
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}