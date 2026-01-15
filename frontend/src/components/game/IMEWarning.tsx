interface IMEWarningProps {
  show: boolean;
}

export function IMEWarning({ show }: IMEWarningProps) {
  if (!show) return null;

  return (
    <div className="mb-2 p-3 bg-yellow-900/50 border border-yellow-500 rounded-lg text-yellow-300 text-sm">
      ⚠️ 全角入力モードになっています。半角英数字で入力してください。
    </div>
  );
}
