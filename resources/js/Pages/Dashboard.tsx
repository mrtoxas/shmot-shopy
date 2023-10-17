import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { NewLanding } from '@/components/modals/newLandingModal';
import { PageHead } from '@/components/ui/pageHead';
import { useFlashToasts } from '@/hooks/useFlashToasts';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { LandingsTable } from '@/components/landingsTable';
import { useEffect } from 'react';
import useStore from '@/store';

export default function Dashboard({ auth, flash }: PageProps) {

  useFlashToasts(flash);

  const { getLandings } = useStore();

  useEffect(() => {
    getLandings();
  }, [])

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
