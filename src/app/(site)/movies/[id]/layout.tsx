import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovie } from "@/lib/movie";
import { MovieTabs } from "./_components/movie-tabs";

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

export default async function MovieLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movie = await getMovie(id);

	if (!movie) {
		notFound();
	}

	return (
		<div className="mx-auto max-w-3xl p-8">
			<div className="flex flex-col gap-6 sm:flex-row">
				{movie.poster_path && (
					<Image
						src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
						alt={`${movie.title}のポスター`}
						width={200}
						height={300}
						className="h-auto w-[200px] shrink-0 rounded"
						priority
					/>
				)}

				<div>
					<h1 className="text-2xl font-bold">{movie.title}</h1>
					<p className="mt-1 text-gray-600">公開日: {movie.release_date}</p>
				</div>
			</div>

			<div className="mt-8">
				<MovieTabs id={id} />
			</div>

			<div className="mt-6">{children}</div>
		</div>
	);
}