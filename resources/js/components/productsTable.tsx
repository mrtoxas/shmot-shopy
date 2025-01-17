import { useMemo } from "react";
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from "@/components/shadcn/ui/button";
import { usePage } from "@inertiajs/react";
import { CopyIcon, Loader2Icon, PencilIcon, Trash2Icon } from "@/components/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/shadcn/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/shadcn/ui/alert-dialog";
import useLandingsStore from "@/store/landingsStore";
import { formatDate } from "@/utils/formatDate";
import { toast } from "@/components/shadcn/ui/use-toast"
import { useLoader } from "@/hooks/useLoading";
import useAppStore from "@/store/appStore";

interface ProductsTableProps {
  toggleNewProductDialog: () => void
}

export const ProductsTable = (props: ProductsTableProps) => {
  const { landingId } = usePage().props;
  const { currentLanding, removeProduct } = useLandingsStore();
  const { startLoading, stopLoading, isLoading } = useLoader();  
  const { setNewProductCloneId } = useAppStore();
  const { toggleNewProductDialog } = props;

  const deleteProductHandler = async (id: App.Models.Product["id"]) => {    
    startLoading();

    removeProduct(Number(landingId), id).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading());
  }

  const cloneClickHandler = (cloneId: App.Models.Product["id"]) => {    
    setNewProductCloneId(cloneId);
    toggleNewProductDialog();
  }

  const preparedData = useMemo(() => {
    if (!currentLanding?.products) return;

    return currentLanding?.products.map((el) => {
      return (
        <TableRow key={el.id}>
          <TableCell className="font-medium">
            <Link
              className="hover:text-blue-600"
              href={route('product.admin', { landingId: String(landingId), productId: el.id })}
              title="Редагувати"
            >
              <strong>{el.name}</strong>
            </Link>
          </TableCell>
          <TableCell>{el.article}</TableCell>
          <TableCell>{formatDate(String(el.created_at))}</TableCell>
          <TableCell className="text-right">
            <div className="flex gap-2 justify-end flex-nowrap">
                <Button onClick={() => cloneClickHandler(el.id)} variant="outline" size="icon" className="hover:text-blue-600" title="Клонувати">
                  <CopyIcon className="h-4 w-4" />
                </Button>
              <Link
                className={buttonVariants({ variant: "outline", size: 'icon', className: 'hover:text-green-600' })}
                href={route('product.admin', { landingId: String(landingId), productId: el.id })}
                title="Редагувати"
              >
                <PencilIcon className="h-4 w-4" />
              </Link>
              <AlertDialog>
                <AlertDialogTrigger className={buttonVariants({ variant: "outline", size: 'icon', className: 'hover:text-red-600' })} title="Видалити">
                  <Trash2Icon className="h-4 w-4" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ви дійсно бажаєте видалити товар <strong>{el.name}</strong>? Цю дію не можна буде скасувати!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Ні, залишити</AlertDialogCancel>
                    <Button disabled={isLoading} onClick={() => deleteProductHandler(el.id)} variant="destructive">
                        {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Так, видалити
                    </Button>                   
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TableCell>
        </TableRow>
      )
    })
  }, [currentLanding?.products, landingId, isLoading])


  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Назва</TableHead>
            <TableHead>Артикул</TableHead>
            <TableHead>Створено</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {preparedData}
        </TableBody>
      </Table>
    </>
  )
}