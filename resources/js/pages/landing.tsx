import { useEffect } from 'react';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { PageHead } from '@/components/ui/pageHead';
import { LandingSettingsForm } from '@/components/forms/landingSettingsForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import useLandingStore from '@/store/landingsStore';
import { usePage } from '@inertiajs/react';
import { Loader2Icon } from '@/components/ui/icons';

export default function Landing({ auth, flash }: PageProps) {
  const {
    getLandingWithData,
    clearCurrentLanding,
    currentLanding,
    isPagePending,
    setPagePending
  } = useLandingStore();

  const { landingId } = usePage().props;

  useEffect(() => {
    setPagePending(true);
    getLandingWithData(Number(landingId)).finally(() => setPagePending(false));
    return () => clearCurrentLanding();
  }, []);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <PageHead message={`Налаштування сайту ${currentLanding?.name || ""}`} />
        </div>
      }
    >
      <Head title="Мої сайти" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-6">Загальнi налаштування</h2>
          <LandingSettingsForm />
        </div>
      </div>

      {isPagePending && (
        <div className="fixed flex items-center justify-center inset-0 z-10 w-full h-full bg-white dark:bg-black opacity-80">
          <Loader2Icon className="animate-spin h-[2rem] w-[2rem] color-blue" />
        </div>
      )}


    </AuthenticatedLayout>
  )
}

