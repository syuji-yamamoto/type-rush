import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        
        // TODO: APIと連携
        console.log('Login attempt:', { email, password })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    ログイン
                </h1>

                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8">
                    {error && (
                        <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">
                            メールアドレス
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">
                            パスワード
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
                    >
                        ログイン
                    </button>

                    <p className="text-gray-400 text-center mt-6">
                        アカウントをお持ちでない方は{' '}
                        <Link to="/register" className="text-cyan-400 hover:underline">
                            新規登録
                        </Link>
                    </p>
                </form>

                <div className="text-center mt-4">
                    <Link to="/" className="text-gray-300 hover:text-white">
                        ← ホームに戻る
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
