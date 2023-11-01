import { useEffect, useState } from 'react';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useFlashToasts } from '@/hooks/useFlashToasts';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { PageHead } from '@/components/ui/pageHead';
import useLandingStore from '@/store/landingsStore';
import { Head } from '@inertiajs/react';
import { Loader2Icon, PlusIcon } from '@/components/ui/icons';
import useAppStore from '@/store/appStore';

export default function Product({ auth, flash }: PageProps) {
	useFlashToasts(flash);
	const { landingId, productId } = usePage().props;

	const { isPagePending, setPagePending } = useAppStore();

	const {
    getLandingWithData,
    clearCurrentLanding, 
    currentLanding, 
    getTemplates
  } = useLandingStore();

  useEffect(() => {
    setPagePending(true);
    if (!currentLanding) {
    	getLandingWithData(Number(landingId)).finally(() => setPagePending(false));
    }
    
    //return () => clearCurrentLanding();
  }, [currentLanding]);

	return (
			<AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <PageHead message={`Налаштування - ${currentLanding?.name || ""} - ${productId}`} />
        </div>
      }
    >
      <Head title="Товар productId" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"></div>
      </div>

      {isPagePending && (
        <div className="fixed flex items-center justify-center inset-0 z-10 w-full h-full bg-white dark:bg-black opacity-80">
          <Loader2Icon className="animate-spin h-[2rem] w-[2rem]" />
        </div>
      )}
      </AuthenticatedLayout>
		)
}