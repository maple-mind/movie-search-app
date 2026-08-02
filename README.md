# 映画検索アプリ

TMDB API を利用した映画の検索・詳細閲覧・お気に入り管理に加え、OpenAI API による作品紹介文の自動生成を実装した Webアプリケーションです。

🔗 **デモ**: https://movie-search-app-omega-livid.vercel.app/

📁 **リポジトリ**: https://github.com/maple-mind/movie-search-app

![アプリのスクリーンショット](./docs/screenshot.png)
<!-- スクリーンショットを docs/screenshot.png に置いてください -->

---

## 使用技術

| 分類 | 技術 |
|---|---|
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript |
| UI | React 19 / Tailwind CSS |
| データ取得・状態管理 | TanStack Query v5 |
| バリデーション | Zod |
| 外部API | TMDB API / OpenAI API（Responses API） |
| デプロイ | Vercel |

---

## 主な機能

- **映画検索**: キーワード検索（デバウンス処理・ページネーション対応）
- **映画詳細（タブ構成）**: 「概要／キャスト／類似作品」の3タブ。ポスター・タイトルは固定し、タブ下のみ切り替わる
- **お気に入り**: 詳細ページからの登録／解除、一覧ページでの確認（localStorage に永続化）
- **AI紹介文生成**: OpenAI API による作品紹介文の生成

---

## 設計上の判断

- **ルーティング**: ルートグループ `(site)` で共通ヘッダー・フッターをまとめ、ネストされたレイアウトで映画詳細のタブ枠を保持。タブ移動時も親レイアウトは再レンダリングされず、状態とスクロール位置を維持。

- **Server / Client の境界**: Server Component を基本とし、`"use client"` は状態・イベント・クライアント専用フックを使う末端の部品にのみ付与。バンドルサイズと秘密情報保護の観点から境界を最小化。

- **キャッシュ戦略**: Next.js 15 以降 `fetch` はデフォルト非キャッシュのため、データの性質で明示的に選択。映画詳細・キャスト・類似作品は `revalidate: 3600`（変化が少なく共有度が高い）、検索は `no-store`（クエリごとに異なる）。

- **API キーの保護**: 認証情報は `NEXT_PUBLIC_` を付けずサーバー側のみに保持。Client から呼ぶ検索・AI生成は Route Handler をプロキシとして経由し、キーをブラウザに露出させない。

- **実行時バリデーション**: 型注釈は実行時の形状を保証しないため、外部データが入る境界（API レスポンス・リクエストボディ・localStorage）すべてで Zod の `safeParse` を実施。型は `z.infer` でスキーマから生成。

- **コスト配慮**: 従量課金の OpenAI API は `useMutation` によるボタン起動とし、生成中は `disabled` で二重呼び出しを防止。検索は 500ms デバウンスで呼び出しを抑制。

- **アクセシビリティ**: 非同期状態を `aria-live` / `aria-busy` で伝達、お気に入りを `aria-pressed`、タブの現在位置を `aria-current` で表現し、色以外でも判別可能に。

---

## 環境変数

ローカルで動かす場合、`.env.local` に以下が必要です。

```
TMDB_ACCESS_TOKEN   # TMDB の Read Access Token
OPENAI_API_KEY      # OpenAI の API キー
OPENAI_MODEL        # 使用するモデル名
```

---

## 今後の改善予定

- テストコードの追加（Vitest / Testing Library）
- 一覧表示部分の共通コンポーネント化
- 認証機能とデータベースの導入（お気に入りのサーバー側保存、Server Actions の活用）