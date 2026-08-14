import type { Metadata } from "next";
import FavoritesList from "@/components/FavoritesList";

export const metadata: Metadata = {
	title: "お気に入り",
};

export default function FavoritesPage() {
	return (
		<main className="mx-auto max-w-3xl p-8">
			<h1 className="text-2xl font-bold">お気に入り</h1>
			<div className="mt-4">
				<FavoritesList />
			</div>
		</main>
	);
}
