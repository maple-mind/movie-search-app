import MovieGrid from "@/components/MovieGrid";
import { getNowPlayingMovies } from "@/lib/movie";

export default async function NowPlayingMovies() {
	const movies = await getNowPlayingMovies();

	if (movies.length === 0) {
		return (
			<p className="text-gray-500">上映中の作品が見つかりませんでした。</p>
		);
	}

	return <MovieGrid movies={movies} />;
}
