import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/shadcn/ui/dropdown-menu';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import {
    User2 as User2Icon,
    ChevronDown as ChevronDownIcon,
} from "lucide-react";

interface ProfileDropdownProps {
    user: User;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
            >
                <User2Icon className="h-4 w-4" />
                <ChevronDownIcon className="h-4 w-4" />
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