import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2Icon } from "@/components/ui/icons"
import useLandingsStore from "@/store/landingsStore"
import { usePage } from "@inertiajs/react";
import { Button } from "@/components/shadcn/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form"
import { Input } from "@/components/shadcn/ui/input"
import { toast } from "@/components/shadcn/ui/use-toast"
import { useLoader } from "@/hooks/useLoading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select"
import { useMemo } from "react"
import useAppStore from "@/store/appStore"

interface CreateProductFormProps {
  finallyAction: () => void;
}

interface ProductWidthCloneId extends App.Models.Product {
  clone: string;
}

const FormSchema = z.object({
  name: z.string().min(1, { message: "Назва обов'язкова" }),
  article: z.string().min(1, { message: "Артикул обов'язковий" }),
  clone: z.string().optional()
})

export const NewProductForm = (props: CreateProductFormProps) => {
  const { createProduct, currentLanding } = useLandingsStore();
  const { landingId } = usePage().props;
  const { startLoading, stopLoading, isLoading } = useLoader();
  const { newProductCloneId } = useAppStore();

  const cloneOptionsPrepared = useMemo(() => (
    currentLanding?.products?.map((item) => <SelectItem key={item.id} value={String(item.article)}>{item.name}</SelectItem>)
  ), [currentLanding?.products]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      article: "",
      clone: currentLanding?.products?.find(item => item.id === newProductCloneId)?.article || ""
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startLoading();

    let cloneId;

    if (newProductCloneId) {
      cloneId = currentLanding?.products?.find(item => item.id === newProductCloneId)?.id;
    }
    else if (data.clone) {      
      cloneId = currentLanding?.products?.find(item => item.article === data.clone)?.id;
    }

    const preparedData = { ...data, clone: cloneId ? String(cloneId) : "" }

    return createProduct(Number(landingId), preparedData as ProductWidthCloneId).then((res) => {
      props.finallyAction();
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 pb-4">
          <FormField
            control={form.control}
            name="name"

            render={({ field }) => (
              <FormItem>
                <FormLabel>Назва</FormLabel>
                <FormControl>
                  <Input className="w-full" required {...field} placeholder="Введiть назву" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Артикул</FormLabel>
                <FormControl>
                  <Input className="w-full" required {...field} placeholder="Введiть артикул" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clone"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Товар для клонування</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!currentLanding?.products?.length}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть товар для клонування" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="overflow-y-auto max-h-[20rem]">
                    {cloneOptionsPrepared}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Додати</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}