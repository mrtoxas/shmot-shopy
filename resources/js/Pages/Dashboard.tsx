import { useCallback, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Landing, PageProps } from '@/types';
import { NewLandingDialog } from '@/components/dialogs/newLandingDialog';
import { PageHead } from '@/components/ui/pageHead';
import { useFlashToasts } from '@/hooks/useFlashToasts';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { LandingsTable } from '@/components/LandingsTable';
import useStore from '@/store/landingsStore';
import { Button } from '@/components/shadcn/ui/button';
import { PlusIcon } from '@/components/ui/icons';
import useAppStore from '@/store/appStore';

export default function Dashboard({ auth, flash }: PageProps) {

  useFlashToasts(flash);

  const { getLandings } = useStore();

  const { setIsOpenNewLandingDialog } = useAppStore();

  useEffect(() => {
    getLandings();
  }, [])

  const showNewLandingDialog = () => {
    setIsOpenNewLandingDialog(true, null);    
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between align-center">
          <PageHead message="Мої сайти" />
          <Button onClick={showNewLandingDialog}>
            <PlusIcon className="mr-2 h-4 w-4" />Додати сайт
          </Button>
        </div>
      }
    >
      <Head title="Мої сайти" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <LandingsTable />
        </div>
      </div>

      <NewLandingDialog />
    </AuthenticatedLayout>
  );
}
