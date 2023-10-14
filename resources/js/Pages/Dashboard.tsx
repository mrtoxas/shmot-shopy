
import { Head } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { NewLanding } from '@/Components/NewLanding';
import { PageHead } from '@/Components/ui/PageHead';
import { useFlashToasts } from '@/Hooks/useFlashToasts';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { LandingsTable } from '@/Components/LandingsTable';

export default function Dashboard({ auth, flash }: PageProps) {
  useFlashToasts(flash);
  
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between align-center">

          <PageHead message="Мої сайти" />
          <NewLanding />
        </div>
      }
    >
      <Head title="Мої сайти" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <LandingsTable />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
