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
| データベース | Neon（PostgreSQL） |
| ORM | Prisma 7 |
| 書き込み処理 | Server Actions |
| デプロイ | Vercel |

---

## 主な機能

- **映画検索**: キーワード検索（デバウンス処理・ページネーション対応）
- **映画詳細（タブ構成）**: 「概要／キャスト／類似作品」の3タブ。ポスター・タイトルは固定し、タブ下のみ切り替わる
- **お気に入り**: 詳細ページからの登録／解除、一覧ページでの確認（localStorage に永続化）
- **AI紹介文生成**: OpenAI API による作品紹介文の生成
- **レビュー投稿**: 映画ごとのレビュー投稿・一覧・削除（Server Actions と PostgreSQL による永続化）

---

## 設計上の判断

- **ルーティング**: ルートグループ `(site)` で共通ヘッダー・フッターをまとめ、ネストされたレイアウトで映画詳細のタブ枠を保持。タブ移動時も親レイアウトは再レンダリングされず、状態とスクロール位置を維持。

- **Server / Client の境界**: Server Component を基本とし、`"use client"` は状態・イベント・クライアント専用フックを使う末端の部品にのみ付与。バンドルサイズと秘密情報保護の観点から境界を最小化。

- **キャッシュ戦略**: Next.js 15 以降 `fetch` はデフォルト非キャッシュのため、データの性質で明示的に選択。映画詳細・キャスト・類似作品は `revalidate: 3600`（変化が少なく共有度が高い）、検索は `no-store`（クエリごとに異なる）。

- **API キーの保護**: 認証情報は `NEXT_PUBLIC_` を付けずサーバー側のみに保持。Client から呼ぶ検索・AI生成は Route Handler をプロキシとして経由し、キーをブラウザに露出させない。

- **実行時バリデーション**: 型注釈は実行時の形状を保証しないため、外部データが入る境界（API レスポンス・リクエストボディ・localStorage）すべてで Zod の `safeParse` を実施。型は `z.infer` でスキーマから生成。

- **コスト配慮**: 従量課金の OpenAI API は `useMutation` によるボタン起動とし、生成中は `disabled` で二重呼び出しを防止。検索は 500ms デバウンスで呼び出しを抑制。

- **アクセシビリティ**: 非同期状態を `aria-live` / `aria-busy` で伝達、お気に入りを `aria-pressed`、タブの現在位置を `aria-current` で表現し、色以外でも判別可能に。

- **データ取得経路の使い分け**: TMDB は API キーの秘匿が必要なため Route Handler をプロキシとして経由。一方 DB は Server Component から Prisma を直接呼び、同一サーバー内での不要な HTTP 往復を避けた。経路の違いは「隠すべき秘密があるか」で判断している。

- **バリデーションの適用範囲**: 外部 API レスポンス・localStorage・フォーム入力には Zod を適用する一方、DB からの読み取りには適用していない。Prisma のスキーマが単一の正であり型が保証されるため、形状が不確実な境界のみに絞ることで冗長な検証を避けた。

- **評価値の範囲チェック**: `rating` は DB 上 `Int` 型のため 1〜5 の制約を表現できない。範囲の保証は Server Action 内の Zod に集約し、HTML の `maxLength` などクライアント側の制限は UX 目的と割り切って正しさの担保はサーバー側に置いた。

- **楽観的更新**: レビュー削除は `useOptimistic` で即座に UI へ反映し、DB 往復の待ち時間を体感させない。失敗時は React が元の状態へ自動復帰するため、削除のような低リスクかつ復元可能な操作に限定して適用している。

- **認証のスコープ外化**: 投稿者名は自由入力とし、削除も制限していない。認証とロール管理は別途学習範囲として切り離し、本アプリでは Server Actions とデータ永続化の設計に焦点を絞る判断とした。

---

## 環境変数

ローカルで動かす場合、`.env.local` に以下が必要です。

```
TMDB_ACCESS_TOKEN   # TMDB の Read Access Token
OPENAI_API_KEY      # OpenAI の API キー
OPENAI_MODEL        # 使用するモデル名
DATABASE_URL        # Neon のプール接続（アプリ用）
DIRECT_URL          # Neon の直接接続（Prisma CLI のマイグレーション用）
```

---

## 今後の改善予定

- テストコードの追加（Vitest / Testing Library）
- 一覧表示部分の共通コンポーネント化
- 認証機能の導入（投稿者の識別、自身の投稿のみ削除可能にする）
- 削除失敗時のユーザーへの通知（現状は楽観的更新の復帰のみで、理由が伝わらない）