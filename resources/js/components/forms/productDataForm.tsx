import useLandingsStore from "@/store/landingsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { 
  Form, 
  FormDescription, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { useEffect } from "react";
import { toast } from "@/components/shadcn/ui/use-toast";
import { Loader2Icon } from "@/components/ui/icons";
import { Checkbox } from "@/components/shadcn/ui/checkbox";

const FormSchema = z.object({
  sizes: z.string().nullable(),
  price: z.string().nullable(),
  discount: z.string().nullable(),
  rest: z.string().nullable(),
})

export const ProductDataForm = () => {
  const { landingId, productId } = usePage().props;

  const { currentProduct, updateProductData } = useLandingsStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sizes: "",
      price: null,
      discount: null,
      rest: null,
    }
  });

  const { formState: isSubmitting } = form;

  useEffect(() => {
    if (!currentProduct?.product_data) return;

    const { product_data } = currentProduct;

    form.reset({
      sizes: product_data.sizes ? product_data.sizes : "",
      price: product_data.price ? String(product_data.price) : null,
      discount: product_data.rest ? String(product_data.rest) : null,
      rest: product_data.rest ? String(product_data.rest) : null,
    });
  }, [currentProduct?.product_data]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {    
    return updateProductData( 
      Number(landingId), 
      Number(productId), 
      data as App.Models.ProductData).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Розмiри (,)</FormLabel>
                  <FormControl>
                    <Input className="w-full" {...field} value={String(field.value) || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цiна, грн.</FormLabel>
                  <FormControl>
                    <Input className="w-full" type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Знижка, %</FormLabel>
                  <FormControl>
                    <Input className="w-full" type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Залишок, шт.</FormLabel>
                  <FormControl>
                    <Input className="w-full" type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <Button disabled={isSubmitting.isSubmitting} type="submit">
              {isSubmitting.isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Зберегти
            </Button>
          </div>
        </div>
        
      </form>
    </Form>
  )

}