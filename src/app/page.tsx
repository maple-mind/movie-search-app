import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export default function Home() {
	return (
		<main className="mx-auto max-w-3xl p-8">
			<h1 className="text-2xl font-bold">映画検索アプリ</h1>
			<div className="mt-4">
				<SearchBox />
			</div>
			<Link
				href="/movies"
				className="mt-4 inline-block text-blue-600 underline"
			>
				映画一覧へ
			</Link>
		</main>
	);
}