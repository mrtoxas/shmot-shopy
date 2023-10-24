import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { NewLandingDialog } from '@/components/dialogs/newLandingDialog';
import { PageHead } from '@/components/ui/pageHead';
import { useFlashToasts } from '@/hooks/useFlashToasts';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { LandingsTable } from '@/components/LandingsTable';
import useLandingStore from '@/store/landingsStore';
import { Button } from '@/components/shadcn/ui/button';
import { Loader2Icon, PlusIcon } from '@/components/ui/icons';
import useAppStore from '@/store/appStore';

export default function Landings({ auth, flash }: PageProps) {

  useFlashToasts(flash);

  const { getLandings } = useLandingStore();
  const { setIsOpenNewLandingDialog } = useAppStore();
  const [isLandingLoaded, setIsLandingLoaded] = useState(true);

  useEffect(() => {
    getLandings().finally(() => setIsLandingLoaded(false));
  }, [])

  const showNewLandingDialog = () => {
    setIsOpenNewLandingDialog(null);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
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
          { isLandingLoaded && (
            <div className="flex justify-center items-center mt-8">
              <Loader2Icon className="h-8 w-8 animate-spin stroke-red" />
            </div>
          )}                  
        </div>
      </div>

      <NewLandingDialog />
    </AuthenticatedLayout>
  );
}
