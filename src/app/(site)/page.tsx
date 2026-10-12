import { Suspense } from "react";
import MovieGridSkeleton from "@/components/MovieGridSkeleton";
import MovieSearch from "@/components/MovieSearch";
import NowPlayingMovies from "@/components/NowPlayingMovies";

export default function Home() {
	return (
		<div className="mx-auto max-w-3xl p-8">
			<h1 className="text-2xl font-bold">映画を探す</h1>
			<div className="mt-4">
				<MovieSearch />
			</div>
			<section aria-labelledby="now-playing-heading" className="mt-10">
				<h2 id="now-playing-heading" className="text-xl font-bold">
					上映中の作品
				</h2>
				<div className="mt-4">
					<Suspense fallback={<MovieGridSkeleton count={8} />}>
						<NowPlayingMovies />
					</Suspense>
				</div>
			</section>
		</div>
	);
}
