import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type ProfileAvatarProps = {
  name: string;
  imageSrc?: string;
  className?: string;
};

export function ProfileAvatar({ name, imageSrc, className }: ProfileAvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <Avatar className={cn('size-40 border-4 border-primary/50 shadow-[0_0_0_8px_oklch(0.6_0.2_277/0.12),0_0_60px_-5px_var(--color-primary)] max-sm:size-36', className)}>
      {imageSrc && (
        <AvatarImage src={imageSrc} alt={`${name} profile`} />
      )}
      <AvatarFallback className="bg-linear-to-br from-blue-500 to-violet-500 text-5xl font-bold text-white max-sm:text-4xl">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
