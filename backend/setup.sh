#!/bin/bash

# Laravel プロジェクトのセットアップスクリプト
# Docker コンテナ内で実行してください

echo "🚀 Laravel プロジェクトをセットアップしています..."

# Laravel がインストールされていない場合は新規作成
if [ ! -f "artisan" ]; then
    echo "📦 Laravel をインストールしています..."
    composer create-project laravel/laravel . --prefer-dist
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
