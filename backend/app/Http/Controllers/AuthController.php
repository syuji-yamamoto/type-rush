<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * 新規ユーザー登録（ニックネーム認証）
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:1|max:20|unique:users',
            'password' => 'required|string|min:4|confirmed',
        ], [
            'name.required' => 'ニックネームは必須です',
            'name.min' => 'ニックネームは1文字以上で入力してください',
            'name.max' => 'ニックネームは20文字以内で入力してください',
            'name.unique' => 'このニックネームは既に使用されています',
            'password.required' => 'パスワードは必須です',
            'password.min' => 'パスワードは4文字以上で入力してください',
            'password.confirmed' => 'パスワードが一致しません',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->name . '@typerush.local',
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => '登録が完了しました',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'token' => $token,
        ], 201);
    }

    /**
     * ゲストログイン（ワンクリック）
     */
    public function guestLogin()
    {
        $guestId = 'guest_' . time() . '_' . substr(str_shuffle('abcdefghijklmnopqrstuvwxyz0123456789'), 0, 6);

        $user = User::create([
            'name' => $guestId,
            'email' => $guestId . '@guest.typerush.local',
            'password' => Hash::make($guestId),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'ゲストとしてログインしました',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'token' => $token,
        ], 201);
    }

    /**
     * ログイン（ニックネーム認証）
     */
    public function login(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ], [
            'name.required' => 'ニックネームは必須です',
            'password.required' => 'パスワードは必須です',
        ]);

        $user = User::where('name', $request->name)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'name' => ['ニックネームまたはパスワードが正しくありません'],
            ]);
        }

        // 既存のトークンを削除
        $user->tokens()->delete();

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'ログインしました',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'token' => $token,
        ]);
    }

    /**
     * ログアウト
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'ログアウトしました',
        ]);
    }

    /**
     * 認証済みユーザー情報取得
     */
    public function user(Request $request)
    {
        return response()->json([
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
            ],
        ]);
    }
}
