# こころの天気

小学生向けの感情管理アプリ

## 1. 前提条件

以下のツールがインストールされていることを確認してください。  
・Docker Desktop  
・Node.js (v20以上推奨)

## 2. 準備 (初回のみ)

リポジトリをクローンした後、最初に一度だけフロントエンドのライブラリをインストールする必要があります。

`cd frontend`  
`npm install`

## 3. 起動方法

**■ バックエンド（FastAPI） & DB（PostgreSQL）※Dockerで管理**  
プロジェクトのルートディレクトリで実行してください。  
コマンド： `docker-compose up -d --build`  
URL： http://localhost:8000

**■ フロントエンド (Next.js)**  
frontend フォルダに移動して実行してください。  
コマンド： `npm run dev`  
URL： http://localhost:3000

## 4. 終了方法

・フロントエンド：実行中のターミナルで `Ctrl + C`  
・Docker： `docker-compose down` を実行

## 5. 開発の進め方（重要）

チームでの競合（エラー）を防ぐため、以下の流れで作業をお願いします。

### ①作業を始める前

ルートディレクトリで、必ず最新のコードを取り込んでください。  
コマンド：  
`git checkout main`  
`git pull origin main`

### ② 作業用ブランチを作る

直接 main で作業せず、自分の作業用ブランチを作ります。  
コマンド：  
`git checkout -b feature/（作業名※半角英数字のみ）`

例）  
※新機能を作るとき： `feature/login-form`　（ログイン画面作成）  
※バグを直すとき： `fix/header-design`　（ヘッダーのデザイン修正）  
※READMEなどを直すとき： `docs/update-readme`　（README更新）

### ③ 作業が終わったらプッシュ

自分のブランチを GitHub に送ります。  
コマンド：  
`git add .`  
`git commit -m "feat: ○○機能の実装"`  
`git push origin feature/（作業名）`

コミットメッセージ　ルール　例）  
※新機能の追加 (feature)： 「feat」　`feat/login-page`  
※バグや表示崩れの修正： 「fix」　`fix/header-design`  
※ドキュメント（READMEなど）の修正：「docs」 `docs/update-readme`  
※機能は変えず、コードを綺麗にした時： 「refactor」　`refactor/clean-code`

### ④ プルリクエストを作成

GitHub上で自分のブランチから main へ「Pull Request」を作成してください。  
作成後、**Discord でチームメンバーにレビュー依頼**を出してください。

### ⑤ レビューとマージ

内容に問題がなければ、**レビュー者がそのまま main へマージ（Merge）**してください。  
マージが完了したら、Discordで作業者に完了した旨を伝えてください。
