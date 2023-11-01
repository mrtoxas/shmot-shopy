import { useMemo } from "react";
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from "./shadcn/ui/button";
import { usePage } from "@inertiajs/react";
import { CopyIcon, Loader2Icon, PencilIcon, Trash2Icon } from "./ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./shadcn/ui/table";
import {
  AlertDialog,  
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction
} from "./shadcn/ui/alert-dialog";
import useLandingsStore from "@/store/landingsStore";
import { formatDate } from "@/utils/formatDate";
import { toast } from "@/components/shadcn/ui/use-toast"

export const ProductsTable = () => {
  const { landingId } = usePage().props;

  const { currentLanding, removeProduct } = useLandingsStore();

  const deleteProductHandler = async (id: App.Models.Product["id"]) => {
    removeProduct(landingId, id).then((res)=>{
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    });
  }

  const preparedData = useMemo(()=>{
    return currentLanding?.products.map((el)=>{
      return ( 
        <TableRow key={el.id}>
            <TableCell className="font-medium">{el.name}</TableCell>
            <TableCell>{el.article}</TableCell>
            <TableCell>{formatDate(el.created_at)}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end flex-nowrap">
                <Link 
                  className={buttonVariants({ variant: "outline", size: 'icon', className: 'hover:text-green-600' })}
                  href={route('product.admin', { landingId, productId:el.id })}                  
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
                      <AlertDialogTitle>Ви впевненні?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Ви дійсно бажаєте видалити товар <strong>{el.name}</strong>? Цю дію не можна буде скасувати!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Ні, залишити</AlertDialogCancel>
                       <AlertDialogAction asChild>
                         <Button onClick={() => deleteProductHandler(el.id)} variant="destructive">Так, видалити</Button>
                       </AlertDialogAction>
                      
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>      
        )
    })
  },[currentLanding?.products])


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