import type { Metadata } from "next";
import Link from "next/link";
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
        <Providers>
			<header className="border-b border-gray-200">
				<nav className="mx-auto flex max-w-3xl gap-4 p-4">
					<Link href="/" className="font-bold">
						映画検索
					</Link>
					<Link href="/favorites">お気に入り</Link>
				</nav>
			</header>
			{children}
		</Providers>
      </body>
    </html>
  );
}
