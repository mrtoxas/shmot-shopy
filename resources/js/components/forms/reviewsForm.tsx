import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select"
import { useLoader } from "@/hooks/useLoading";
import useLandingsStore from "@/store/landingsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePage } from "@inertiajs/react";
import { useEffect, useMemo } from "react"
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../shadcn/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/shadcn/ui/form";
import { Button } from "../shadcn/ui/button";
import { Loader2Icon, PlusIcon, Trash2Icon } from "../ui/icons";
import { Input } from "../shadcn/ui/input";
import { Textarea } from "../shadcn/ui/textarea";

const images = [
  '/reviews/1.jpg',
  '/reviews/2.jpg',
  '/reviews/3.jpg',
];

const FormSchema = z.object({
  reviews: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(1),
      img: z.string().min(1),
      info: z.string().min(1),
      review: z.string().min(1)
    })),
});

export const ReviewsForm = () => {
  const { landingId } = usePage().props;
  const { startLoading, stopLoading, isLoading } = useLoader();
  const { currentLanding, updateReviews } = useLandingsStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const { handleSubmit, control, reset, formState: {errors} } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reviews"
  });

  useEffect(()=>{console.log(currentLanding)}, [currentLanding])

  useEffect(() => {
    if (!currentLanding?.reviews) return;
    reset({
      reviews: currentLanding.reviews
    });
  }, [currentLanding?.reviews]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startLoading();

    updateReviews(Number(landingId), data.reviews).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading());
  }

  const handleAddItem = () => (append({ name: "", img: "", info: "", review: "" }));

  const handleRemoveItem = (index: number) => {    
    remove(index);
  };

  const preparedImageList = useMemo(() => {
    return images.map((item, index) => {      
      return (
        <SelectItem key={index} value={String(index+1)} className="p-0">
          <img width={80} height={80} src={item} alt="Аватар відгука 1" className="w-[80px] h-[80px] object-cover" />
        </SelectItem>
      )
    })
  }, [images]);

  const preparedItems = useMemo(() => {
    if (!fields.length) return (
      <p className="text-sm text-muted-foreground ">Не додано жодного відгуку</p>
    )

    return fields.map((item, index) => {
      return (
        <div key={item.id} className="grid md:grid-cols-[auto,1fr] gap-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name={`reviews.${index}.img`}
              render={({ field }) => (
                <FormItem>
                  <Select required onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[6.5rem] h-[5.5rem] px-1">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" sideOffset={5}>
                      {preparedImageList}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FormField
                control={control}
                name={`reviews.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input required placeholder="Ім'я" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`reviews.${index}.info`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input required placeholder="Інфо" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr,auto]">
            <FormField
              control={form.control}
              name={`reviews.${index}.review`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea required placeholder="Текст відгука" className="min-h-[5.5rem] whitespace-pre-wrap" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button onClick={() => handleRemoveItem(index)} variant="ghost" type="button" className="hover:text-red-600">
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>

        </div>
      )
    })
  }, [fields])



  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {preparedItems}
        <div className="mt-4 flex gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Зберегти
        </Button>
        <Button variant="secondary" type="button" onClick={handleAddItem}>
          <PlusIcon className="mr-2 h-4 w-4" /> Додати відгук
        </Button>
      </div>
      </form>      
    </Form>

  )
}