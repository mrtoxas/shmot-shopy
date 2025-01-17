import { useMemo } from "react";
import { Button, buttonVariants } from "@/components/shadcn/ui/button";
import { formatDate } from "@/utils/formatDate";
import { Link } from '@inertiajs/react';
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
import useAppStore from "@/store/appStore";
import { toast } from "@/components/shadcn/ui/use-toast"
import { useLoader } from "@/hooks/useLoading";

interface LandingsTableProps {
  toggleNewLandingDialog: () => void
}

export const LandingsTable = (props: LandingsTableProps) => {
  const { landings, removeLanding } = useLandingsStore();

  const { setNewLandingCloneName } = useAppStore();

  const { toggleNewLandingDialog } = props;

  const { startLoading, stopLoading, isLoading } = useLoader();

  const deleteLandingHandler = async (id: App.Models.Landing["id"]) => {
    startLoading();

    removeLanding(id).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading());;
  }

  const cloneClickHandler = (cloneName: App.Models.Landing["name"]) => {
    setNewLandingCloneName(cloneName);
    toggleNewLandingDialog();
  }

  const preparedData = useMemo(() => {
    return (
      landings.map((el) => {
        const link = `${window.location.protocol}//${el.name}.${window.location.hostname}`;
        const date = formatDate(el.created_at!);

        return (
          <TableRow key={el.id}>
            <TableCell className="font-medium">
              <Link
                className="hover:text-blue-600"
                href={route('landing.admin', el.id)}
                title="Редагувати"
              >
                <strong>{el.name}</strong>
              </Link>
            </TableCell>
            <TableCell>
              <a className="hover:text-blue-600" href={link} target="_blank">{link}</a>
            </TableCell>
            <TableCell>{date}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end flex-nowrap">
                <Button onClick={() => cloneClickHandler(el.name)} variant="outline" size="icon" className="hover:text-blue-600" title="Клонувати">
                  <CopyIcon className="h-4 w-4" />
                </Button>
                <Link
                  className={buttonVariants({ variant: "outline", size: 'icon', className: 'hover:text-green-600' })}
                  href={route('landing.admin', el.id)}
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
                        Ви дійсно бажаєте видалити сайт <strong>{el.name}</strong>? Цю дію не можна буде скасувати!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Ні, залишити</AlertDialogCancel>
                      <Button disabled={isLoading} onClick={() => deleteLandingHandler(el.id)} variant="destructive">
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
    )
  }, [landings, isLoading])


  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Назва</TableHead>
            <TableHead>Адреса</TableHead>
            <TableHead>Створено</TableHead>
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