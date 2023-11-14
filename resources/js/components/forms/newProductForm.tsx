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

interface CreateProductFormProps {
  finallyAction: () => void;
}
const FormSchema = z.object({
  name: z.string().min(1, { message: "Назва обов'язкова" }),
  article: z.string().min(1, { message: "Артикул обов'язковий" })
})

export const NewProductForm = (props: CreateProductFormProps) => {
  const { createProduct } = useLandingsStore();

  const { landingId } = usePage().props;

  const { startLoading, stopLoading, isLoading } = useLoader();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      article: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startLoading();

    return createProduct(Number(landingId), data as App.Models.Product).then((res) => {
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
          <div className="text-right">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Додати</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}