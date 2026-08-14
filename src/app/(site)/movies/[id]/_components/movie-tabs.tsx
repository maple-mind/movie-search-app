"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
	{ segment: "", label: "概要" },
	{ segment: "credits", label: "キャスト" },
	{ segment: "similar", label: "類似作品" },
	{ segment: "reviews", label: "レビュー" },
] as const;

export function MovieTabs({ id }: { id: string }) {
	const pathname = usePathname();
	const base = `/movies/${id}`;

	return (
		<nav aria-label="作品情報">
			<ul className="flex gap-1 border-b border-gray-200">
				{TABS.map(({ segment, label }) => {
					const href = segment ? `${base}/${segment}` : base;
					const isActive = pathname === href;

					return (
						<li key={label}>
							<Link
								href={href}
								aria-current={isActive ? "page" : undefined}
								className={
									isActive
										? "-mb-px block border-b-2 border-sky-600 px-4 py-2 text-sm font-bold text-sky-700"
										: "-mb-px block border-b-2 border-transparent px-4 py-2 text-sm text-gray-500 hover:text-gray-900"
								}
							>
								{label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
