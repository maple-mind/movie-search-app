import Image from "next/image";
import { getMovieCredits } from "@/lib/movie";

export default async function MovieCreditsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const cast = await getMovieCredits(id);

	if (cast.length === 0) {
		return <p className="text-gray-500">キャスト情報がありません。</p>;
	}

	return (
		<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{cast.slice(0, 12).map((member) => (
				<li key={member.id} className="flex items-center gap-3">
					{member.profile_path ? (
						<Image
							src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
							alt={`${member.name}の写真`}
							width={48}
							height={48}
							className="h-12 w-12 shrink-0 rounded-full object-cover"
						/>
					) : (
						<div
							className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-400"
							role="img"
							aria-label="写真なし"
						>
							No
						</div>
					)}
					<div className="min-w-0">
						<p className="truncate text-sm font-bold">{member.name}</p>
						<p className="truncate text-xs text-gray-500">
							{member.character}
						</p>
					</div>
				</li>
			))}
		</ul>
	);
}