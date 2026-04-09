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
