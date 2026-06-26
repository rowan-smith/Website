import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type ProfileAvatarProps = {
  name: string;
  imageSrc?: string;
  className?: string;
};

export default function ProfileAvatar(props: ProfileAvatarProps) {
  const imageSrc = props.imageSrc ?? '/data/profile-image.jpg';

  const initials = props.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <Avatar className={cn('mb-2 size-40 border-4 border-indigo-500/25 shadow-[0_12px_30px_rgba(99,102,241,0.4)] max-sm:size-36', props.className,)}>
      {imageSrc && (
        <AvatarImage src={imageSrc} alt={`${props.name} profile`} />
      )}
      <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-500 text-5xl font-bold text-white max-sm:text-4xl">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
