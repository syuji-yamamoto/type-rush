#!/bin/sh

# Laravel プロジェクトのセットアップスクリプト
# Docker コンテナ内で実行してください

set -eu

echo "🚀 Laravel プロジェクトをセットアップしています..."

# Laravel がインストールされていない場合は新規作成
if [ ! -f "artisan" ]; then
    echo "📦 Laravel をインストールしています..."

    # backend/ には setup.sh や .gitkeep がありディレクトリが空ではないため、
    # 一時ディレクトリに作成してから中身をコピーします
    TMP_DIR="/tmp/laravel-setup-$$"
    composer create-project laravel/laravel "$TMP_DIR" --prefer-dist
    cp -a "$TMP_DIR"/. .
    rm -rf "$TMP_DIR"
fi

# .env ファイルの設定
if [ ! -f ".env" ]; then
    cp .env.example .env
    php artisan key:generate
fi

# データベース設定を更新
sed -i 's/DB_HOST=127.0.0.1/DB_HOST=db/' .env
sed -i 's/DB_DATABASE=laravel/DB_DATABASE=type_rush/' .env
sed -i 's/DB_USERNAME=root/DB_USERNAME=type_rush_user/' .env
sed -i 's/DB_PASSWORD=/DB_PASSWORD=type_rush_password/' .env

# 依存関係のインストール
composer install

# マイグレーション実行
php artisan migrate

echo "✅ セットアップが完了しました！"
