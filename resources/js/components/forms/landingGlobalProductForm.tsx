import { useMemo} from 'react';
import useLandingsStore from "@/store/landingsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { useEffect } from "react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { toast } from "@/components/shadcn/ui/use-toast";
import { Loader2Icon } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/ui/select"

const FormSchema = z.object({
  sizes: z.string().nullable(),
  price: z.string().nullable(),
  discount: z.string().nullable(),
  rest: z.string().nullable(),
  drop_price: z.string().nullable(),
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
    }
  });

  const { formState: isSubmitting } = form;

  useEffect(() => {
    if (!currentLanding?.global_product) return;

    const { global_product } = currentLanding;

    form.reset({
      sizes: global_product.sizes,
      price: global_product.price,
      discount: global_product.discount,
      rest: global_product.rest,
      drop_price: global_product.drop_price,
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
                    <Input className="w-full" {...field} value={field.value || ""} />
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
                    <Input className="w-full" {...field} value={field.value || ""} />
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
                    <Input className="w-full" {...field} value={field.value || ""} />
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
                    <Input className="w-full" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
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