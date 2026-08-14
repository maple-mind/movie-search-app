import Link from "next/link";

const dummyMovieIds = ["550", "13", "27205"];

export default function MoviesPage() {
	return (
		<main className="mx-auto max-w-3xl p-8">
			<h1 className="text-2xl font-bold">映画一覧</h1>
			<ul className="mt-4 space-y-2">
				{dummyMovieIds.map((id) => (
					<li key={id}>
						<Link href={`/movies/${id}`} className="text-blue-600 underline">
							映画 {id} の詳細へ
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
