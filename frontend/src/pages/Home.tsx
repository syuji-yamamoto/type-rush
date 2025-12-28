import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">
                    Type<span className="text-cyan-400">Rush</span>
                </h1>
                <p className="text-gray-300 text-xl mb-12">
                    1分間のタイピングチャレンジ
                </p>
                
                <div className="space-y-4">
                    <Link
                        to="/game"
                        className="block w-64 mx-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
                    >
                        ゲームを始める
                    </Link>
                    
                    <Link
                        to="/results"
                        className="block w-64 mx-auto bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
                    >
                        スコア履歴
                    </Link>
                    
                    <div className="flex justify-center gap-4 mt-8">
                        <Link
                            to="/login"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            ログイン
                        </Link>
                        <span className="text-gray-500">|</span>
                        <Link
                            to="/register"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            新規登録
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
