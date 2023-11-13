import { useEffect, useState, useCallback } from "react";
import { usePage } from '@inertiajs/react'
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/shadcn/ui/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog"
import { toast } from "@/components/shadcn/ui/use-toast";
import useLandingsStore from "@/store/landingsStore"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Trash2Icon, FileEditIcon } from "@/components/ui/icons";
import { Loader2Icon } from "@/components/ui/icons";
import { useLoader } from "@/hooks/useLoading";

const FormSchema = z.object({
  name: z.string().min(1)
})

export const LandingSetupForm = () => {
  const { landingId } = usePage().props;  

  const { startLoading, stopLoading, isLoading } = useLoader();

  const { currentLanding, removeLanding, renameLanding } = useLandingsStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    }
  });

  const { setValue } = form;

  useEffect(() => {
    if (currentLanding) setValue('name', currentLanding?.name);
  }, [currentLanding]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startLoading();
    return renameLanding(Number(landingId), data as App.Models.Landing).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading())
  }

  const handleDeleteLanding = useCallback(() => {
    startLoading();
    if (currentLanding?.id) removeLanding(currentLanding?.id).then((res) => {
      window.location.href = route('landings');
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading());
  }, [currentLanding])

  return (
    <div className="flex justify-between gap-4 items-end flex-wrap">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/3  space-y-6">
          <div className="grid gap-4">
            <div className="gap-2 items-end flex-wrap">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нова назва</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit" className="mt-4">
                {isLoading
                  ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  : <FileEditIcon className="h-4 w-4 mr-2" />}
                Перейменувати
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" type="submit" className="mt-4">
              {isLoading
                ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                : <Trash2Icon className="h-4 w-4 mr-2" />}
              Видалити сайт
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Видалення сайту </AlertDialogTitle>
              <AlertDialogDescription>
                Ви дійсно хочете видалити сайт <strong>{currentLanding?.name}</strong>? Цю дію не можна буде скасувати!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Нi, залишити</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleDeleteLanding} type="submit" variant="destructive">
                  Так, видалити
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}