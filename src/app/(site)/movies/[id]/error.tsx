"use client";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className="mx-auto max-w-3xl p-8">
			<p role="alert">エラーが発生しました。</p>
			<button
				onClick={() => reset()}
				className="mt-2 rounded bg-blue-600 px-4 py-2 text-white"
			>
				再試行
			</button>
		</main>
	);
}
