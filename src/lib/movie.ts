import { z } from "zod";

const movieSchema = z.object({
	title: z.string(),
	overview: z.string(),
	release_date: z.string(),
});

export type Movie = z.infer<typeof movieSchema>;

export async function getMovie(id: string): Promise<Movie | null> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?language=ja-JP`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
			},
			next: { revalidate: 3600 },
		},
	);

	if (res.status === 404) {
		return null;
	}
	if (!res.ok) {
		throw new Error("映画データの取得に失敗しました");
	}

	const json = await res.json();
	const result = movieSchema.safeParse(json);

	if (!result.success) {
		throw new Error("映画データの形式が想定と異なります");
	}

	return result.data;
}