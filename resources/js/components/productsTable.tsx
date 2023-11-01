import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from "./shadcn/ui/button";
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
  AlertDialogTrigger
} from "./shadcn/ui/alert-dialog";

export const ProductsTable = () => {
	return (
			<Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Назва</TableHead>
            <TableHead>Артикул</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Назва 1</TableCell>
            <TableCell>Артикул 1</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end flex-nowrap">
                <Link 
                  className={buttonVariants({ variant: "outline", size: 'icon', className: 'hover:text-green-600' })}
                  href=''                  
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
                        Ви дійсно бажаєте видалити товар <strong>%назва продукту%</strong>? Цю дію не можна буде скасувати!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Ні, залишити</AlertDialogCancel>
                      <Button variant="destructive">Так, видалити</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>          
        </TableBody>
      </Table>
		)
}