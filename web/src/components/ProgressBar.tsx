interface ProgressbarProps {
  progress: number;
}

export function ProgressBar({progress}: ProgressbarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4 overflow-hidden">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-violet-600 w-3/4 transition-all"
        style={{width: `${progress}0%`}}
      ></div>
    </div>
  );
}
