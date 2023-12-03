import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';


export default function Welcome({ auth, flash }: PageProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
     <div>
       <div className="flex gap-4 items-end justify-center">
       <img width="50" height="50" src="/fav/android-chrome-512x512.png" alt="" />
       <h1 className="text-lg font-bold">Shmot-Shopy</h1>
     </div>
     <div className="mt-6 text-center">
       {auth.user ? (
          <Link
            href={route('landings')}
            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
          >
          Мої сайти
        </Link>
        ) : (
          <div>
            <Link
              href={route('login')}
              className="text-sm  hover:text-gray-900 dark:text-white dark:hover:text-gray-600"
            >Вхiд</Link>

            <Link
             href={route('register')}
              className="ml-4 text-sm  hover:text-gray-900 dark:text-white dark:hover:text-gray-600"
            >Реєстрація</Link>
          </div>
        )
    }
     </div>
    </div>
     

     



      
    </div>
  )
}
