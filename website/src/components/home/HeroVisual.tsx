import { Zap } from 'lucide-react';

import { CodeWindow } from '@/components/common/CodeWindow';
import { ProfileAvatar } from '@/components/common/ProfileAvatar';
import { resolveAssetPath } from '@/lib/resolveAssetPath';

type HeroVisualProps = {
  name: string;
  imageSrc: string;
  fields: Record<string, string | string[]>;
  highlight?: { value: string; label: string };
};

const ghostPanelClass = 'absolute inset-0 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm';

export function HeroVisual({ name, imageSrc, fields, highlight }: HeroVisualProps) {
  const variable = name.split(' ')[0].toLowerCase();

  return (
    <div className="relative flex items-center justify-center py-10" aria-hidden="true">
      <div className="relative shrink-0">
        <div className="absolute -inset-8 rounded-full border border-primary/25 bg-[radial-gradient(circle,transparent_60%,oklch(0.6_0.2_277/0.12))]" />
        <div className="absolute -inset-16 rounded-full border border-primary/10 max-sm:hidden" />
        <span className="absolute -top-10 right-2 size-4 rounded-full bg-linear-to-br from-indigo-300 to-indigo-600 shadow-[0_0_16px_var(--color-primary)]" />
        <span className="absolute top-1/2 -left-20 size-1.5 rounded-full bg-indigo-300 shadow-[0_0_8px_var(--color-indigo-300)] max-sm:hidden" />
        <span className="absolute -bottom-2 -left-6 size-1.5 rounded-full bg-emerald-400 max-sm:hidden" />
        <div className="rounded-full bg-linear-to-br from-sky-400 via-indigo-500 to-violet-500 p-1 shadow-[0_0_60px_-4px_var(--color-indigo-500)]">
          <ProfileAvatar name={name} imageSrc={imageSrc} className="size-56 border-4 border-background shadow-none max-sm:size-44" />
        </div>
        <span className="absolute top-1 -right-3 flex size-14 items-center justify-center rounded-full border border-white/20 bg-slate-950/90 shadow-[0_0_20px_-4px_var(--color-primary)] max-sm:size-12">
          <img className="size-8" src={resolveAssetPath('favicon-dark.svg')} alt="" />
        </span>
        {highlight && (
          <div className="absolute -right-20 -bottom-6 rounded-xl border bg-card px-4 py-3 shadow-xl backdrop-blur-md transform-[perspective(800px)_rotateY(-10deg)] max-sm:-right-4">
            <p className="text-2xl leading-none font-bold">{highlight.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{highlight.label}</p>
          </div>
        )}
      </div>
      <div className="relative ml-20 hidden w-80 shrink-0 transform-[perspective(1200px)_rotateY(-14deg)_rotateX(4deg)] xl:block">
        <div className={`${ghostPanelClass} -translate-x-8 -translate-y-6 opacity-50`} />
        <div className={`${ghostPanelClass} -translate-x-4 -translate-y-3 opacity-80`} />
        <CodeWindow className="relative" comment="Build. Learn. Share." variable={variable} fields={fields} />
        <div className="absolute top-12 -right-20 flex items-center gap-2.5 rounded-xl border bg-card px-4 py-3 text-sm shadow-xl backdrop-blur-md">
          <Zap className="size-5 fill-primary text-primary" />
          <span className="leading-tight">Turning ideas<br />into real things.</span>
        </div>
      </div>
    </div>
  );
}
