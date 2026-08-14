import { z } from "zod";

// ===== 映画詳細 =====

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

// ===== 検索 =====

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
			cache: "no-store",
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
	};
}

// ===== キャスト（出演者） =====

const castMemberSchema = z.object({
	id: z.number(),
	name: z.string(),
	character: z.string(),
	profile_path: z.string().nullable(),
});

const creditsResponseSchema = z.object({
	cast: z.array(castMemberSchema),
});

export type CastMember = z.infer<typeof castMemberSchema>;

export async function getMovieCredits(id: string): Promise<CastMember[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits?language=ja-JP`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
			},
			next: { revalidate: 3600 },
		},
	);

	if (!res.ok) {
		throw new Error("キャスト情報の取得に失敗しました");
	}

	const json = await res.json();
	const result = creditsResponseSchema.safeParse(json);

	if (!result.success) {
		throw new Error("キャスト情報の形式が想定と異なります");
	}

	return result.data.cast;
}

// ===== 類似作品 =====

const similarResponseSchema = z.object({
	results: z.array(movieSummarySchema),
});

export async function getSimilarMovies(id: string): Promise<MovieSummary[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/similar?language=ja-JP`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
			},
			next: { revalidate: 3600 },
		},
	);

	if (!res.ok) {
		throw new Error("類似作品の取得に失敗しました");
	}

	const json = await res.json();
	const result = similarResponseSchema.safeParse(json);

	if (!result.success) {
		throw new Error("類似作品の形式が想定と異なります");
	}

	return result.data.results;
}
