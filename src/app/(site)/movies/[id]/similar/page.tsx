import MovieGrid from "@/components/MovieGrid";
import { getSimilarMovies } from "@/lib/movie";

export default async function SimilarMoviesPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movies = await getSimilarMovies(id);

	if (movies.length === 0) {
		return <p className="text-gray-500">類似作品が見つかりませんでした。</p>;
	}

	return <MovieGrid movies={movies.slice(0, 8)} />;
}
