import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { PageHead } from '@/components/ui/pageHead';
import { useFlashToasts } from '@/hooks/useFlashToasts';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { LandingsTable } from '@/components/landingsTable';
import useLandingStore from '@/store/landingsStore';
import { Button } from '@/components/shadcn/ui/button';
import { Loader2Icon, PlusIcon } from '@/components/ui/icons';
import useAppStore from '@/store/appStore';
import { NewLandingForm } from '@/components/forms/newLandingForm';
import { Dialog } from '@/components/ui/dialog';

export default function Landings({ auth, flash }: PageProps) {

  useFlashToasts(flash);

  const { getLandings } = useLandingStore();
  const [isLandingLoaded, setIsLandingLoaded] = useState(true);
  const [isOpenNewLandingDialog, setIsOpenNewLandingDialog] = useState(false);
  const { setNewLandingCloneName } = useAppStore();

  const newLandingDialogToggle = () => setIsOpenNewLandingDialog((prevState) => !prevState);

  const addLandingHandler = () => {
    setNewLandingCloneName("");
    newLandingDialogToggle();
  }

  useEffect(() => {
    getLandings().finally(() => setIsLandingLoaded(false));
  }, [])

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <PageHead message="Мої сайти" />
          <Button onClick={addLandingHandler}>
            <PlusIcon className="mr-2 h-4 w-4" />Додати сайт
          </Button>
        </div>
      }
    >
      <Head title="Мої сайти" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <LandingsTable toggleNewLandingDialog={newLandingDialogToggle} />
          { isLandingLoaded && (
            <div className="flex justify-center items-center mt-8">
              <Loader2Icon className="h-8 w-8 animate-spin stroke-red" />
            </div>
          )}                  
        </div>
      </div>

      <Dialog
        isOpen={isOpenNewLandingDialog}
        setIsOpen={setIsOpenNewLandingDialog}
        body={<NewLandingForm finallyAction={newLandingDialogToggle} />}
        title="Додати сайт"
        description="Cтворюйте новий сайт або клонуйте вже існуючий"
       />

    </AuthenticatedLayout>
  );
}
