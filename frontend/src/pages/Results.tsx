import { Link } from 'react-router-dom'

// サンプルデータ（後でAPIから取得）
const sampleResults = [
    { id: 1, wpm: 65, accuracy: 94, date: '2024-12-28 14:30' },
    { id: 2, wpm: 58, accuracy: 91, date: '2024-12-28 10:15' },
    { id: 3, wpm: 72, accuracy: 96, date: '2024-12-27 18:45' },
    { id: 4, wpm: 55, accuracy: 88, date: '2024-12-27 09:20' },
    { id: 5, wpm: 61, accuracy: 92, date: '2024-12-26 20:00' },
]

function Results() {
    // 最高スコア計算
    const bestWPM = Math.max(...sampleResults.map(r => r.wpm))
    const avgWPM = Math.round(sampleResults.reduce((acc, r) => acc + r.wpm, 0) / sampleResults.length)
    const avgAccuracy = Math.round(sampleResults.reduce((acc, r) => acc + r.accuracy, 0) / sampleResults.length)

    return (
        <div className="min-h-screen p-4">
            {/* ヘッダー */}
            <div className="mb-8">
                <Link to="/" className="text-gray-300 hover:text-white">
                    ← ホームに戻る
                </Link>
            </div>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    スコア履歴
                </h1>

                {/* 統計サマリー */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-800 rounded-lg p-6 text-center">
                        <p className="text-gray-400 mb-2">最高WPM</p>
                        <p className="text-4xl font-bold text-cyan-400">{bestWPM}</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6 text-center">
                        <p className="text-gray-400 mb-2">平均WPM</p>
                        <p className="text-4xl font-bold text-purple-400">{avgWPM}</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6 text-center">
                        <p className="text-gray-400 mb-2">平均精度</p>
                        <p className="text-4xl font-bold text-green-400">{avgAccuracy}%</p>
                    </div>
                </div>

                {/* 履歴テーブル */}
                <div className="bg-slate-800 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="text-left text-gray-300 p-4">日時</th>
                                <th className="text-center text-gray-300 p-4">WPM</th>
                                <th className="text-center text-gray-300 p-4">精度</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleResults.map((result) => (
                                <tr key={result.id} className="border-t border-slate-700">
                                    <td className="text-gray-300 p-4">{result.date}</td>
                                    <td className="text-center p-4">
                                        <span className={`font-bold ${result.wpm === bestWPM ? 'text-cyan-400' : 'text-white'}`}>
                                            {result.wpm}
                                        </span>
                                    </td>
                                    <td className="text-center p-4">
                                        <span className={`${result.accuracy >= 95 ? 'text-green-400' : result.accuracy >= 90 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {result.accuracy}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 練習開始ボタン */}
                <div className="text-center mt-8">
                    <Link
                        to="/game"
                        className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
                    >
                        練習を始める
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Results
