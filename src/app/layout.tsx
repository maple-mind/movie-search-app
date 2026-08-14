import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "映画検索アプリ",
		template: "%s | 映画検索アプリ",
	},
	description: "TMDB APIを使った映画検索アプリ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
