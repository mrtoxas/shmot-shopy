import { useEffect } from 'react';
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

export default function Product({ auth, flash }: PageProps) {
	useFlashToasts(flash);

	const { landingId, productId } = usePage().props;

	const { isPagePending, setPagePending } = useAppStore();

	const {
    getProductWithData,     
  } = useLandingStore();

  useEffect(() => {
    setPagePending(true);
    getProductWithData(Number(landingId), Number(productId))
      .finally(() => setPagePending(false));
  }, []);

	return (
			<AuthenticatedLayout
      user={auth.user}
      header={
        <div >
          <PageHead message={`Налаштування товару - ${productId}`} />
          <Link 
        		href={route('landing.admin', { landingId: String(landingId) })}
        		className="flex items-center text-sm mt-4">
        		<ArrowLeftIcon className="h-4 w-4 mr-2" /> Повернутись
        	</Link>
        </div>
      }
    >
      <Head title="Товар productId" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        	<h2 className="text-lg font-semibold leading-none tracking-tight mb-6">Дані товару</h2>
        	<ProductDataForm />
          <Separator className='mt-8 mb-8'/>          
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-6">Характеристики</h2>
          <ProductFeaturesForm />
          <Separator className='mt-8 mb-8'/>
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-6">Зображення</h2>
          <ProductImagesForm />
          <Separator className='mt-8 mb-8'/>
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-6">Варіанти</h2>
          <ProductVariantsForm />
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