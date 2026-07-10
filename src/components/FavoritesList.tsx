"use client";

import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesList() {
	const { favorites, isLoaded } = useFavorites();

	if (!isLoaded) {
		return null;
	}

	if (favorites.length === 0) {
		return (
			<p className="text-gray-600">
				お気に入りはまだありません。映画を検索して追加してみましょう。
			</p>
		);
	}

	return (
		<ul className="space-y-3">
			{favorites.map((movie) => (
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
						<span className="text-blue-600 underline">{movie.title}</span>
					</Link>
				</li>
			))}
		</ul>
	);
}