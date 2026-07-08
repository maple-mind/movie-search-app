import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getMovie } from "@/lib/movie";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const movie = await getMovie(id);

	if (!movie) {
		return { title: "映画が見つかりません" };
	}

	return {
		title: movie.title,
		description: movie.overview,
	};
}

export default async function MovieDetailPage({
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
		<main className="mx-auto max-w-3xl p-8">
			<h1 className="text-2xl font-bold">{movie.title}</h1>
			<p className="mt-1 text-gray-600">公開日: {movie.release_date}</p>

			{movie.poster_path && (
				<Image
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={`${movie.title}のポスター`}
					width={300}
					height={450}
					className="mt-4 rounded h-auto"
					priority
				/>
			)}

			<p className="mt-4 leading-relaxed">{movie.overview}</p>
		</main>
	);
}