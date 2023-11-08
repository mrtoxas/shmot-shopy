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

const FormSchema = z.object({
  name: z.string().min(1)
})

export const LandingSetupForm = () => {
	const { landingId } = usePage().props;
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { currentLanding, removeLanding, renameLanding } = useLandingsStore();

	const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    }
  });

  const { handleSubmit, setValue } = form;

  useEffect(() => {
    if (currentLanding) setValue('name', currentLanding?.name);
  }, [currentLanding]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    return renameLanding(Number(landingId), data as App.Models.Landing).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    })
  }

  const handleDeleteLanding = useCallback(()=>{
  	setIsSubmitting(true);
  	if(currentLanding?.id) removeLanding(currentLanding?.id).then((res)=>{
  		window.location.href = route('landings');
  		toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
  	}).finally(()=> setIsSubmitting(false));
  },[currentLanding])

	return (
		<>
		<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
        <div className="grid gap-4">
          <div className="pb-4">
          	<FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              <FileEditIcon className="h-4 w-4 mr-2" />Перейменувати
            </Button>
          </div>
        </div>
      </form>
    </Form>
    <div>
      <AlertDialog>
				<AlertDialogTrigger asChild>
				  <Button variant="destructive" type="submit" className="mt-4">
				  	<Trash2Icon className="h-4 w-4 mr-2" /> Видалити сайт
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
  </>
	)
}