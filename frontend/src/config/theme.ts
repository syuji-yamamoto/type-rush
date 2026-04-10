/**
 * ランク情報の型定義
 */
export interface RankInfo {
  rank: string;
  color: string;
  label: string;
}

/**
 * KPMに基づいてランクを算出
 * @param kpm KPM値
 * @returns ランク情報
 */
export function getRank(kpm: number): RankInfo {
  if (kpm >= 400) return { rank: "S", color: "text-yellow-400", label: "達人" };
  if (kpm >= 300)
    return { rank: "A", color: "text-purple-400", label: "上級者" };
  if (kpm >= 200) return { rank: "B", color: "text-blue-400", label: "中級者" };
  if (kpm >= 100)
    return { rank: "C", color: "text-green-400", label: "初級者" };
  return { rank: "D", color: "text-gray-400", label: "練習中" };
}
