import { NextResponse, type NextRequest } from "next/server";
import { searchMovies } from "@/lib/movie";

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get("query");

	if (!query) {
		return NextResponse.json({ results: [] });
	}

	const results = await searchMovies(query);
	return NextResponse.json({ results });
}