import { z } from "zod";

const movieSchema = z.object({
	title: z.string(),
	overview: z.string(),
	release_date: z.string(),
	poster_path: z.string().nullable(),
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


const movieSummarySchema = z.object({
	id: z.number(),
	title: z.string(),
	poster_path: z.string().nullable(),
});

const searchResponseSchema = z.object({
	page: z.number(),
	total_pages: z.number(),
	results: z.array(movieSummarySchema),
});

export type MovieSummary = z.infer<typeof movieSummarySchema>;

export type SearchResult = {
	results: MovieSummary[];
	totalPages: number;
};

export async function searchMovies(
	query: string,
	page: number,
): Promise<SearchResult> {
	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ja-JP&page=${page}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
			},
		},
	);

	if (!res.ok) {
		throw new Error("映画の検索に失敗しました");
	}

	const json = await res.json();
	const result = searchResponseSchema.safeParse(json);

	if (!result.success) {
		throw new Error("検索結果の形式が想定と異なります");
	}

	return {
		results: result.data.results,
		totalPages: result.data.total_pages,
	}
}