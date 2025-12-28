# Type Rush

タイピングゲームのプロジェクト。1分間でタイピングしてデータを記録し、気軽にタイピング練習ができるアプリです。

## 技術スタック

### フロントエンド
- TypeScript
- React
- Tailwind CSS

### バックエンド
- PHP
- Laravel

### データベース
- MySQL

### インフラ
- AWS (EC2, RDS)
- Docker

### CI/CD
- GitHub Actions

## 主要機能

1. ログイン、新規登録機能
2. タイピングゲーム機能（1分間）
3. スコア記録・履歴機能
4. 音量調整・音量オンオフ機能

## プロジェクト構成

```
type-rush/
├── backend/        # Laravelのバックエンドコード
├── frontend/       # Reactのフロントエンドコード
├── docker/         # Docker関連の設定ファイル
└── README.md       # プロジェクトの概要説明
```

## 開発環境のセットアップ

### 前提条件
- Docker Desktop がインストールされていること
- Node.js (v20以上) がインストールされていること
- Git がインストールされていること

### 起動方法

#### 1. バックエンド（Docker）

```bash
# リポジトリをクローン
git clone <repository-url>
cd type-rush

# Docker コンテナを起動（バックエンド + MySQL + phpMyAdmin）
docker-compose up -d

# 初回のみ: Laravelプロジェクトをセットアップ
docker-compose exec backend bash
# コンテナ内で実行:
composer create-project laravel/laravel .
# .envのDB設定を変更（DB_HOST=db, DB_DATABASE=type_rush, DB_USERNAME=type_rush_user, DB_PASSWORD=type_rush_password）
php artisan migrate
exit
```

#### 2. フロントエンド（ホスト側）

```bash
# フロントエンドディレクトリに移動
cd frontend

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# フロントエンド: http://localhost:3000
# バックエンドAPI: http://localhost:8000
# phpMyAdmin: http://localhost:8080
```

### 開発用コマンド

#### Docker（バックエンド）
```bash
# コンテナの起動
docker-compose up -d

# コンテナの停止
docker-compose down

# ログの確認
docker-compose logs -f

# バックエンドコンテナに入る
docker-compose exec backend bash
```

#### フロントエンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint
```

## ライセンス

MIT License
