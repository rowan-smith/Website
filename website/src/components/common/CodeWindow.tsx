import { cn } from '@/lib/utils';

type CodeWindowProps = {
  variable: string;
  fields: Record<string, string | string[]>;
  comment?: string;
  className?: string;
};

export function CodeWindow({ variable, fields, comment, className }: CodeWindowProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-slate-950/85 font-mono text-[12px] leading-6 text-slate-300 shadow-[0_20px_60px_-20px_oklch(0.3_0.2_277/0.8)] backdrop-blur-md',
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400" />
        <span className="size-2.5 rounded-full bg-amber-400" />
        <span className="size-2.5 rounded-full bg-emerald-400" />
      </div>
      <pre className="overflow-hidden px-4 py-3">
        {comment && <span className="text-slate-500">{`// ${comment}\n\n`}</span>}
        <span className="text-violet-400">const</span> <span className="text-sky-300">{variable}</span> = {'{\n'}
        {Object.entries(fields).map(([key, value]) => (
          <span key={key}>
            {'  '}<span className="text-sky-300">{key}</span>:{' '}
            {Array.isArray(value) ? (
              <>
                {'[\n'}
                {value.map((item) => (
                  <span key={item}>{'    '}<span className="text-pink-300">&quot;{item}&quot;</span>,{'\n'}</span>
                ))}
                {'  ],\n'}
              </>
            ) : (
              <><span className="text-pink-300">&quot;{value}&quot;</span>,{'\n'}</>
            )}
          </span>
        ))}
        {'};'}
      </pre>
    </div>
  );
}
