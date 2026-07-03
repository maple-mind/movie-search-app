export default async function MovieDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<main className="mx-auto max-w-3xl p-8">
			<h1 className="text-2xl font-bold">映画詳細</h1>
			<p>映画ID: {id}</p>
		</main>
	);
}