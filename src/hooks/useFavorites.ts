"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

const favoriteSchema = z.object({
	id: z.number(),
	title: z.string(),
	poster_path: z.string().nullable(),
});

const favoritesSchema = z.array(favoriteSchema);

export type Favorite = z.infer<typeof favoriteSchema>;

const STORAGE_KEY = "favorites";

export function useFavorites() {
	const [favorites, setFavorites] = useState<Favorite[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// ① マウント後（ブラウザ）に localStorage から読み込む
	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const result = favoritesSchema.safeParse(JSON.parse(stored));
				if (result.success) {
					setFavorites(result.data);
				}
			} catch {
				// 壊れたデータは無視する
			}
		}
		setIsLoaded(true);
	}, []);

	// ② favorites が変わったら localStorage に保存（読み込み完了後のみ）
	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
		}
	}, [favorites, isLoaded]);

	const isFavorite = (id: number) => favorites.some((f) => f.id === id);

	const toggleFavorite = (movie: Favorite) => {
		setFavorites((prev) =>
			prev.some((f) => f.id === movie.id)
				? prev.filter((f) => f.id !== movie.id)
				: [...prev, movie],
		);
	};

	return { favorites, isFavorite, toggleFavorite, isLoaded };
}