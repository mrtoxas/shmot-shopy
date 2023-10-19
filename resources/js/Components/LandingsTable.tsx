import { useMemo } from "react";
import { Button, buttonVariants } from "./shadcn/ui/button";
import { formatDate } from "@/utils/formatDate";
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./shadcn/ui/alert-dialog";
import { Landing } from "@/types";
import useLandingsStore from "@/store/landingsStore";
import useAppStore from "@/store/appStore";


export const LandingsTable = () => {
  const { landings, removeLanding } = useLandingsStore();
  const { setIsOpenNewLandingDialog } = useAppStore();

  const deleteLandingHandler = async (id: Landing["id"]) => {
    removeLanding(id);
  }

  const showNewLandingDialog = (cloneName: Landing["name"]) => {    
    setIsOpenNewLandingDialog(true, cloneName);    
  }

  const preparedData = useMemo(() => {
    return (
      landings.map((el) => {
        const link = `${window.location.protocol}//${el.name}.${window.location.hostname}`;
        const date = formatDate(el.created_at);

        return (
          <TableRow key={el.id}>
            <TableCell className="font-medium">{el.name}</TableCell>
            <TableCell>
              <a className="hover:text-blue-600" href={link}>{link}</a>
            </TableCell>
            <TableCell>{date}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end flex-nowrap">
                <Button onClick={()=>showNewLandingDialog(el.name)} variant="outline" size="icon" className="hover:text-green-600" title="Клонувати">
                  <CopyIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:text-green-600" title="Редагувати">
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger className={buttonVariants({ variant: "outline", size: 'icon' })} title="Видалити">
                    <Trash2Icon className="h-4 w-4" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Ви впевненні?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Ви дійсно бажаєте видалити сайт <strong>{el.name}</strong>? Цю дію не можна буде скасувати!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Ні, залишити</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteLandingHandler(el.id)}>Так, видалити</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        )
      })
    )
  }, [landings])


  return (
    <div className="relative">
      {/* <div className="absolute flex justify-center items-center w-full h-full bg-background opacity-80 z-10">
        <Loader2Icon className="h-8 w-8 animate-spin stroke-red" />
      </div> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Назва</TableHead>
            <TableHead>Адреса</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {preparedData}
        </TableBody>
      </Table>
    </div>
  )
}