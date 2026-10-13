import { notFound } from "next/navigation";
import { getMovie } from "@/lib/movie";
import FavoriteButton from "@/components/FavoriteButton";
import RecommendButton from "@/components/RecommendButton";

export default async function MovieOverviewPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movie = await getMovie(id);

	if (!movie) {
		notFound();
	}

	return (
		<div>
			{movie.overview.trim() ? (
				<p className="leading-relaxed text-gray-700">{movie.overview}</p>
			) : (
				<p className="text-gray-500">あらすじは登録されていません。</p>
			)}

			<div className="mt-6">
				<FavoriteButton
					movie={{
						id: Number(id),
						title: movie.title,
						poster_path: movie.poster_path,
					}}
				/>
			</div>

			<RecommendButton
				movieId={Number(id)}
				title={movie.title}
				overview={movie.overview}
			/>
		</div>
	);
}
