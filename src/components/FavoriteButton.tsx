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
			className={`mt-4 rounded px-4 py-2 ${
				active
					? "bg-yellow-500 text-white"
					: "border border-gray-300"
			}`}
		>
			{active ? "★ お気に入り済み" : "☆ お気に入りに追加"}
		</button>
	);
}