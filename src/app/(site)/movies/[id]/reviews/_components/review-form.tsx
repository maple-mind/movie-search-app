"use client";

import { useActionState } from "react";
import { submitReview, type ReviewFormState } from "../actions";

const initialState: ReviewFormState = { status: "idle" };

export function ReviewForm({ movieId }: { movieId: number }) {
	const [state, formAction, isPending] = useActionState(
		submitReview,
		initialState,
	);

	const errors = state.status === "error" ? state.errors : undefined;
	const values = state.status === "error" ? state.values : undefined;

	return (
		// React 19.2.4 時点では自動フォームリセット時に select の defaultValue が復元されない（react#30580）
		// 要素ごとの差異を避けるため、フォーム全体を再マウントして入力値を復元する
		<form
			key={state.status === "error" ? JSON.stringify(values) : "initial"}
			action={formAction}
			className="mb-8 space-y-4"
		>
			<input type="hidden" name="movieId" value={movieId} />

			<div>
				<label htmlFor="author" className="block text-sm font-medium">
					お名前
				</label>
				<input
					id="author"
					name="author"
					type="text"
					maxLength={20}
					defaultValue={values?.author ?? ""}
					className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
				/>
				{errors?.author && (
					<p className="mt-1 text-sm text-red-600">{errors.author[0]}</p>
				)}
			</div>

			<div>
				<label htmlFor="rating" className="block text-sm font-medium">
					評価
				</label>
				<select
					id="rating"
					name="rating"
					defaultValue={values?.rating ?? ""}
					className="mt-1 rounded border border-gray-300 px-3 py-2"
				>
					<option value="">選択してください</option>
					{[5, 4, 3, 2, 1].map((value) => (
						<option key={value} value={String(value)}>
							{value}
						</option>
					))}
				</select>
				{errors?.rating && (
					<p className="mt-1 text-sm text-red-600">{errors.rating[0]}</p>
				)}
			</div>

			<div>
				<label htmlFor="content" className="block text-sm font-medium">
					レビュー
				</label>
				<textarea
					id="content"
					name="content"
					rows={4}
					maxLength={500}
					defaultValue={values?.content ?? ""}
					className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
				/>
				{errors?.content && (
					<p className="mt-1 text-sm text-red-600">{errors.content[0]}</p>
				)}
			</div>

			<div className="flex items-center gap-3">
				<button
					type="submit"
					disabled={isPending}
					className="rounded bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700 disabled:opacity-50"
				>
					{isPending ? "投稿中..." : "投稿する"}
				</button>
				<p aria-live="polite" className="text-sm text-green-700">
					{state.status === "success" && "レビューを投稿しました"}
				</p>
			</div>
		</form>
	);
}
