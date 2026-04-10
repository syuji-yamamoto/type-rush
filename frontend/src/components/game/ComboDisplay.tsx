import { Flame } from "lucide-react";

interface ComboDisplayProps {
  combo: number;
}

export function ComboDisplay({ combo }: ComboDisplayProps) {
  if (combo < 5) return null;

  const getComboColor = () => {
    if (combo >= 50) return "text-yellow-400";
    if (combo >= 30) return "text-purple-400";
    if (combo >= 15) return "text-cyan-400";
    return "text-orange-400";
  };

  return (
    <div
      key={combo}
      className={`flex items-center justify-center gap-2 mb-2 animate-combo-pop ${getComboColor()}`}
    >
      <Flame className="w-5 h-5" />
      <span className="text-lg font-bold">{combo} combo!</span>
    </div>
  );
}
