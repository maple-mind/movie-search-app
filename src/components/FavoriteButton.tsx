"use client";

import { useFavorites, type Favorite } from "@/hooks/useFavorites";

export default function FavoriteButton({ movie }: { movie: Favorite }) {
	const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

	if (!isLoaded) {
		return null;
	}

	const active = isFavorite(movie.id);

	return (
		<button
			onClick={() => toggleFavorite(movie)}
			aria-pressed={active}
			className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
				active
					? "border border-yellow-400 bg-yellow-400 text-yellow-950 hover:bg-yellow-500"
					: "border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
			}`}
		>
			{active ? "★ お気に入り済み" : "☆ お気に入りに追加"}
		</button>
	);
}
