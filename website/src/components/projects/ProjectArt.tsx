import { assetUrl } from '@/lib/assetUrl';
import { cn } from '@/lib/utils';
import type { SiteProject } from '@/types';

type ProjectArtProps = {
  project: SiteProject;
  className?: string;
};

export function ProjectArt({ project, className }: ProjectArtProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-y-0 right-0 w-3/5 overflow-hidden [mask-image:linear-gradient(to_left,black_25%,transparent_80%)]',
        className,
      )}
      aria-hidden="true"
    >
      {project.image ? (
        <img src={assetUrl(project.image)} alt="" className="size-full object-cover object-left opacity-60" loading="lazy" />
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[28px_28px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" />
          <div className="absolute top-1/2 right-[12%] size-48 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
          <span className="absolute top-1/2 right-[14%] -translate-y-1/2 text-[7rem] leading-none opacity-20 blur-[1px] grayscale-[30%]">
            {project.emoji}
          </span>
        </>
      )}
    </div>
  );
}
