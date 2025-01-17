import { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import useLandingStore from '@/store/landingsStore';
import { usePage } from '@inertiajs/react';
import { LinkIcon, Loader2Icon, PlusIcon } from '@/components/ui/icons';
import { useFlashToasts } from '@/hooks/useFlashToasts';
import useAppStore from '@/store/appStore';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { PageHead } from '@/components/ui/pageHead';
import { LandingSettingsForm } from '@/components/forms/landingSettingsForm';
import { GlobalProductForm } from '@/components/forms/globalProductForm';
import { LandingAdvantagesForm } from '@/components/forms/landingAdvantagesForm';
import { LandingSetupForm } from '@/components/forms/landingSetupForm';
import { ThemeVariablesForm } from '@/components/forms/themeVariablesForm';
import { ProductsTable } from '@/components/productsTable';
import { Button } from '@/components/shadcn/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { NewProductForm } from '@/components/forms/newProductForm';
import { ReviewsForm } from '@/components/forms/reviewsForm';
import { PageCard } from '@/components/ui/pageCard';

export default function Landing({ auth, flash }: PageProps) {
  useFlashToasts(flash);

  const [isOpenNewProductDialog, setIsOpenNewProductDialog] = useState(false);

  const { isPagePending, setPagePending, setNewProductCloneId } = useAppStore();

  const {
    getLandingWithData,
    clearCurrentLanding,
    currentLanding,
    getTemplates
  } = useLandingStore();

  const { landingId } = usePage().props;

  useEffect(() => {
    setPagePending(true);
    getTemplates();
    getLandingWithData(Number(landingId)).finally(() => setPagePending(false));
    return () => clearCurrentLanding();
  }, []);

  const newProductDialogToggle = () => setIsOpenNewProductDialog((prevState) => !prevState);

  const newProductHandler = () => {
    setNewProductCloneId(null);
    newProductDialogToggle();
  }

  const landingLink = useMemo(() => {
    return `${window.location.protocol}//${currentLanding?.name}.${window.location.hostname}`;
  }, [currentLanding?.name])

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <PageHead message={`${currentLanding?.name || ""}.${window.location.hostname}`} />
            <a className="px-2 hover:text-blue-600" href={landingLink} target="_blank">
              <LinkIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      }
    >
      <Head title="Мої сайти" />

      <div className="py-6 bg-secondary">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex gap-4 flex-col">

          <PageCard title="Загальнi налаштування">
            <LandingSettingsForm />
          </PageCard>

          <PageCard title="Глобальний продукт">
            <GlobalProductForm />
          </PageCard>

          <PageCard
            title="Товари"
            action={
              <Button onClick={newProductHandler}>
                <PlusIcon className="mr-2 h-4 w-4" /> Додати товар
              </Button>
            }>
            <ProductsTable toggleNewProductDialog={newProductDialogToggle} />
          </PageCard>

          <PageCard title="Налаштування шаблону">
            <ThemeVariablesForm />
          </PageCard>

          <PageCard title="Переваги">
            <LandingAdvantagesForm />
          </PageCard>

          <PageCard title="Відгуки">
            <ReviewsForm />
          </PageCard>

          <PageCard title="Налаштування сайту">
            <LandingSetupForm />
          </PageCard>
        </div>
      </div>

      <Dialog
        isOpen={isOpenNewProductDialog}
        setIsOpen={setIsOpenNewProductDialog}
        body={<NewProductForm finallyAction={newProductDialogToggle} />}
        title="Додaти товар"
      />

      {isPagePending && (
        <div className="fixed flex items-center justify-center inset-0 z-10 w-full h-full bg-white dark:bg-black opacity-80">
          <Loader2Icon className="animate-spin h-[2rem] w-[2rem]" />
        </div>
      )}

    </AuthenticatedLayout>
  )
}

