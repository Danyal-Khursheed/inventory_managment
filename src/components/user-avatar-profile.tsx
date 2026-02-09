import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: {
    imageUrl?: string;
    fullName?: string | null;
    name?: string | null;
    email?: string;
    emailAddresses?: Array<{ emailAddress: string }>;
  } | null;
}

function getDisplayName(user: UserAvatarProfileProps['user']) {
  return user?.fullName ?? user?.name ?? '';
}
function getEmail(user: UserAvatarProfileProps['user']) {
  if (user?.emailAddresses?.[0]?.emailAddress)
    return user.emailAddresses[0].emailAddress;
  return user?.email ?? '';
}

export function UserAvatarProfile({
  className,
  showInfo = false,
  user
}: UserAvatarProfileProps) {
  const name = getDisplayName(user);
  const email = getEmail(user);
  return (
    <div className='flex items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage src={user?.imageUrl || ''} alt={name} />
        <AvatarFallback className='rounded-lg'>
          {name.slice(0, 2).toUpperCase() || 'CN'}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>{name}</span>
          <span className='truncate text-xs'>{email}</span>
        </div>
      )}
    </div>
  );
}
