import { useEffect, useMemo } from 'react';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useFlashToasts } from '@/hooks/useFlashToasts';
import AuthenticatedLayout from '@/layouts/authenticatedLayout';
import { PageHead } from '@/components/ui/pageHead';
import useLandingStore from '@/store/landingsStore';
import { Head } from '@inertiajs/react';
import { Loader2Icon, ArrowLeftIcon } from '@/components/ui/icons';
import useAppStore from '@/store/appStore';
import { Link } from '@inertiajs/react';
import { ProductDataForm } from '@/components/forms/productDataForm';
import { ProductImagesForm } from '@/components/forms/productImagesForm';
import { ProductFeaturesForm } from '@/components/forms/productFeaturesForm';
import { ProductVariantsForm } from '@/components/forms/productVariantsForm';
import { Separator } from '@/components/shadcn/ui/separator';
import { PageCard } from '@/components/ui/pageCard';
import useLandingsStore from '@/store/landingsStore';

export default function Product({ auth, flash }: PageProps) {
  useFlashToasts(flash);

  const { landingId, productId } = usePage().props;

  const { isPagePending, setPagePending } = useAppStore();

  const { currentLanding, currentProduct } = useLandingsStore();

  const {
    getProductWithData,
    getLandingWithData
  } = useLandingStore();

  useEffect(() => {
    setPagePending(true);
    Promise.all([
      getProductWithData(Number(landingId), Number(productId)),
      getLandingWithData(Number(landingId))
    ]).finally(() => setPagePending(false));
  }, []);

  const head = useMemo(() => {  
    return (currentLanding?.name || currentProduct?.name)
      ? `${currentLanding?.name}.${window.location.hostname} - ${currentProduct?.name}`
      : " "
  }, [currentLanding?.name, currentProduct?.name]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div >
          <PageHead message={head} />
          <Link
            href={route('landing.admin', { landingId: String(landingId) })}
            className="flex items-center text-sm mt-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" /> Повернутись
          </Link>
        </div>
      }
    >
      <Head title="Товар productId" />

      <div className="py-6 bg-secondary">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex gap-4 flex-col">
          {/* <PageCard title="Дані товару">
            <ProductDataForm />
          </PageCard> */}

          <PageCard title="Характеристики">
            <ProductFeaturesForm />
          </PageCard>

          <PageCard title="Зображення">
            <ProductImagesForm />
          </PageCard>

          <PageCard title="Варіанти">
            <ProductVariantsForm />
          </PageCard>
        </div>
      </div>

      {isPagePending && (
        <div className="fixed flex items-center justify-center inset-0 z-10 w-full h-full bg-white dark:bg-black opacity-80">
          <Loader2Icon className="animate-spin h-[2rem] w-[2rem]" />
        </div>
      )}
    </AuthenticatedLayout>
  )
}