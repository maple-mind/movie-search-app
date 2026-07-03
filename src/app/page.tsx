import Link from "next/link";

export default function Home() {
	return (
		<main className="mx-auto max-w-3xl p-8">
			<h1 className="text-2xl font-bold">映画検索アプリ</h1>
			<Link href="/movies" className="text-blue-600 underline">
				映画一覧へ
			</Link>
		</main>
	);
}