import { useState, PropsWithChildren, ReactNode } from 'react';
import ResponsiveNavLink from '@/components/ui/responsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Toaster } from '@/components/shadcn/ui/toaster';
import { ProfileDropdown } from '@/components/ui/profileDropdown';
import { ModeToggle } from '@/components/theme/modeToggle';
import { LayoutListIcon, MenuIcon } from '@/components/ui/icons';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen">
      <nav className="border-b bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-12 ">
            <div className="flex gap-2 items-center hover:text-gray-300">
              <Link href={route('landings')} title='Мої сайти'>                
                <LayoutListIcon className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ml-3 relative">
                <ModeToggle />
                <ProfileDropdown user={user} />
              </div>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <MenuIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route('landings')} active={route().current('landings')}>
              Мої сайти
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800">{user.name}</div>
              <div className="font-medium text-sm text-gray-500">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('profile.edit')}>Профіль</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Вийти
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="border-b-2 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>{children}</main>
      <Toaster />
    </div>
  );
}
