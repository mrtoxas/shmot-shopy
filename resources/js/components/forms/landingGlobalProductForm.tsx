import { useEffect } from "react";
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
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { toast } from "@/components/shadcn/ui/use-toast";
import { Loader2Icon } from "@/components/ui/icons";
import { Checkbox } from "@/components/shadcn/ui/checkbox";

const FormSchema = z.object({
  sizes: z.string().nullable(),
  price: z.string().nullable(),
  discount: z.string().nullable(),
  rest: z.string().nullable(),
  drop_price: z.string().nullable(),
  is_pub: z.boolean()
})

export const LandingGlobalProductForm = () => {
  const { landingId } = usePage().props;

  const { currentLanding, updateGlobalProduct } = useLandingsStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sizes: null,
      price: null,
      discount: null,
      rest: null,
      drop_price: null,
      is_pub: false,
    }
  });

  const { formState: isSubmitting } = form;

  useEffect(() => {
    if (!currentLanding?.global_product) return;

    const { global_product } = currentLanding;

    form.reset({
      sizes: global_product.sizes,
      price: global_product.price ? String(global_product.price) : null,
      discount: global_product.discount ? String(global_product.discount) : null,
      rest: global_product.rest ? String(global_product.rest) : null,
      drop_price: global_product.drop_price ? String(global_product.drop_price) : null,
      is_pub: global_product.is_pub
    });
  }, [currentLanding]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {    
    return updateGlobalProduct(Number(landingId), data as App.Models.GlobalProduct).then((res) => {
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-4">
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Розмiри (,)</FormLabel>
                  <FormControl>
                    <Input className="w-full" {...field} value={field.value || ""} />
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
            <FormField
              control={form.control}
              name="drop_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дроп.цiна, грн.</FormLabel>
                  <FormControl>
                    <Input className="w-full" type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
                control={form.control}
                name="is_pub"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Використовувати для всіх продуктів
                      </FormLabel>
                      <FormDescription>
                        При відключенні цієї опції, у кожного товару будуть свої дані
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
        </div>
          <div className="mt-4">
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