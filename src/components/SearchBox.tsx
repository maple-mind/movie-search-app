"use client";

import { useState } from "react";

export default function SearchBox() {
	const [query, setQuery] = useState("");

	return (
		<input
			type="text"
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			placeholder="映画タイトルを入力"
			aria-label="映画を検索"
			className="w-full rounded border border-gray-300 px-3 py-2"
		/>
	);
}