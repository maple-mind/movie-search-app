import Image from "next/image";
import Link from "next/link";
import type { MovieSummary } from "@/lib/movie";

export default function MovieGrid({ movies }: { movies: MovieSummary[] }) {
	return (
		<ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
			{movies.map((movie) => (
				<li key={movie.id}>
					<Link href={`/movies/${movie.id}`} className="block">
						{movie.poster_path ? (
							<Image
								src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
								alt={`${movie.title}のポスター`}
								width={160}
								height={240}
								className="aspect-2/3 w-full rounded object-cover"
							/>
						) : (
							<div
								className="flex aspect-2/3 w-full items-center justify-center rounded bg-gray-100 text-xs text-gray-400"
								role="img"
								aria-label="ポスター画像なし"
							>
								No Image
							</div>
						)}
						<p className="mt-2 text-sm">{movie.title}</p>
					</Link>
				</li>
			))}
		</ul>
	);
}
