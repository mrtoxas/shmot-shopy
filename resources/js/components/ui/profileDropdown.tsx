import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/shadcn/ui/dropdown-menu';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { User2Icon, ChevronDownIcon } from "@/components/ui/icons";
import { Button } from '@/components/shadcn/ui/button';

interface ProfileDropdownProps {
  user: User;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User2Icon className="h-[1.2rem] w-[1.2rem]" />
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full" href={route('profile.edit')}>Профіль</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full text-left" href={route('logout')} method="post" as="button">Вийти</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}