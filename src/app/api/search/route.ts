import { NextResponse, type NextRequest } from "next/server";
import { searchMovies } from "@/lib/movie";

export async function GET(request: NextRequest) {
	const query = request.nextUrl.searchParams.get("query");
	const page = Number(request.nextUrl.searchParams.get("page")) || 1;

	if (!query) {
		return NextResponse.json({ results: [], totalPages: 0 });
	}

	const data = await searchMovies(query, page);
	return NextResponse.json(data);
}