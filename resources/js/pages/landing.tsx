import { useEffect } from 'react';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { PageHead } from '@/components/ui/pageHead';
import { LandingSettingsForm } from '@/components/forms/landingSettingsForm';
import { Button } from '@/components/shadcn/ui/button';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import useLandingStore from '@/store/landingsStore';
import { usePage } from '@inertiajs/react';

export default function Landing({ auth, flash }: PageProps){
  const { getLandingWithData } = useLandingStore();
  const { landingId } = usePage().props;

  useEffect(() => {
    getLandingWithData(landingId);
    return () => clearCurrentLanding();
  }, []);
	return (
		<AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <PageHead message="Лендing" />
        </div>
      }
    >
      <Head title="Мої сайти" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        	<h3 className="font-semibold leading-none tracking-tight">Загальнi налаштування</h3>
          <LandingSettingsForm />
        </div>
      </div>

    </AuthenticatedLayout>
		)
}
  
