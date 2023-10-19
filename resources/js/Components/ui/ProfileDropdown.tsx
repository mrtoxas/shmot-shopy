import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/ui/dropdown-menu';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import {
  User2 as User2Icon,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { Button } from '../shadcn/ui/button';

interface ProfileDropdownProps {
  user: User;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
      >
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
          <Link className="w-full" href={route('logout')} method="post">Вийти</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}