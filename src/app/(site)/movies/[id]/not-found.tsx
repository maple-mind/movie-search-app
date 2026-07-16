import Link from "next/link";

export default function NotFound() {
	return (
		<main className="mx-auto max-w-3xl p-8">
			<h1 className="text-2xl font-bold">映画が見つかりません</h1>
			<p className="mt-2 text-gray-600">
				お探しの映画は存在しないか、削除された可能性があります。
			</p>
			<Link
				href="/"
				className="mt-4 inline-block text-blue-600 underline"
			>
				トップページへ戻る
			</Link>
		</main>
	);
}