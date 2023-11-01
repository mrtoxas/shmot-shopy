import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2Icon } from "../ui/icons"
import useLandingsStore from "@/store/landingsStore"
 
import { Button } from "@/components/shadcn/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form"
import { Input } from "@/components/shadcn/ui/input"
 
interface CreateLandingFormProps {
 finallyAction: () => void;  
}
const FormSchema = z.object({
  name: z
    .string({
      required_error: "Назва обов'язкова",
      invalid_type_error: "Неправильний формат",
    })
    .min(3, {
      message: "Назва має містити принаймні 3 символи",
    }),
  article: z
    .string({
      required_error: "Артикул обов'язковий",
      invalid_type_error: "Неправильний формат",
    })
    .min(3, {
      message: "Артикул має містити принаймні 3 символи",
    }),  
  
})

export const NewProductForm = () => {
  const { landings, createProduct } = useLandingsStore();
  
	const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      article: ""
    }    
  })

  const { formState: isSubmitting } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    return createProduct(data).then((res) => {
      props.finallyAction();
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    })
  }

	return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 pb-4">
        	<FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва</FormLabel>
              <FormControl>
                <Input className="w-full" {...field} placeholder="Введiть назву" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Артикул</FormLabel>
              <FormControl>
                <Input className="w-full" {...field} placeholder="Введiть артикул" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right">           
            <Button type="submit" disabled={isSubmitting.isSubmitting}>
              {isSubmitting.isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Додати</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}