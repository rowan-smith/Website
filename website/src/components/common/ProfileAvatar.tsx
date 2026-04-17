type ProfileAvatarProps = {
  name: string;
  imageSrc?: string;
  className?: string;
};

export default function ProfileAvatar({
  name,
  imageSrc = '/data/profile-image.jpg',
  className = '',
}: ProfileAvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');

  if (!imageSrc) {
    return <div className={`profile-avatar ${className}`.trim()}>{initials}</div>;
  }

  return <img className={`profile-avatar ${className}`.trim()} src={imageSrc} alt={`${name} profile`} />;
}
