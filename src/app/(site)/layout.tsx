import Link from "next/link";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b border-gray-200">
				<div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
					<Link href="/" className="text-lg font-bold">
						Movie Search
					</Link>

					<nav aria-label="メインナビゲーション">
						<ul className="flex items-center gap-4">
							<li>
								<Link
									href="/"
									className="text-sm text-gray-600 hover:text-gray-900"
								>
									検索
								</Link>
							</li>
							<li>
								<Link
									href="/favorites"
									className="text-sm text-gray-600 hover:text-gray-900"
								>
									お気に入り
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<main className="flex-1">{children}</main>

			<footer className="border-t border-gray-200">
				<div className="mx-auto max-w-5xl px-4 py-6">
					<p className="text-xs text-gray-500">
						This product uses the TMDB API but is not endorsed or certified by
						TMDB.
					</p>
				</div>
			</footer>
		</div>
	);
}
