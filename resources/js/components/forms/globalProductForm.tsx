import { useEffect } from "react";
import useLandingsStore from "@/store/landingsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { toast } from "@/components/shadcn/ui/use-toast";
import { CalculatorIcon, Loader2Icon } from "@/components/ui/icons";
import { useLoader } from "@/hooks/useLoading";
import { Textarea } from '../shadcn/ui/textarea';

const FormSchema = z.object({
  sizes: z.string().nullable(),
  price: z.number().nullable(),
  discount: z.number().nullable(),
  rest: z.number().nullable(),
  discounted_price: z.number().nullable(),
})

export const GlobalProductForm = () => {
  const { landingId } = usePage().props;

  const { startLoading, stopLoading, isLoading } = useLoader();

  const { currentLanding, updateGlobalProduct } = useLandingsStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sizes: null,
      price: null,
      discount: null,
      rest: null,
      discounted_price: null,
    }
  });

  const { getValues, setValue, register, formState, reset } = form;
  const {isDirty} = formState;

  useEffect(() => {
    if (!currentLanding?.global_product) return;

    const { global_product } = currentLanding;

    form.reset({
      sizes: global_product.sizes,
      price: global_product.price || null,
      discount: global_product.discount || null,
      rest: global_product.rest || null,
      discounted_price: global_product.discounted_price || null,
    });
  }, [currentLanding]);

  const calcPriceDiscount = () => {
    const discount = getValues("discount");
    const price = getValues("price");

    if (!discount && price) setValue("discounted_price", price)
    if (discount && price) setValue("discounted_price", price - (discount / 100) * price);
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!isDirty) return;
    startLoading();

    const preparedData = {
      ...data,
      price: (data.price) ? Number(data.price.toFixed(2)) : null,
      discountedPrice: (data.discounted_price) ? Number(data.discounted_price.toFixed(2)) : null,
    }

    return updateGlobalProduct(Number(landingId), preparedData as unknown as App.Models.GlobalProduct).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => {
      reset(data);
      stopLoading();
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
                    <Input
                      {...field}
                      {...register(field.name, { setValueAs: (value) => Number(value) })}
                      className="w-full"
                      type="number"
                      step="any"
                      min={0}
                      value={field.value || ""}
                    />
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
                    <Input
                      {...field}
                      {...register(field.name, { setValueAs: (value) => Number(value) })}
                      className="w-full"
                      type="number"
                      min={0}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discounted_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цiна зі скидкою, грн.</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input 
                        {...field}
                        {...register(field.name, { setValueAs: (value) => Number(value) })}
                        className="w-full rounded-e-none"
                        type="number"
                        step="any"
                        min={0}
                        value={field.value || ""}                        
                      />
                      <Button onClick={calcPriceDiscount} type="button" variant="outline" size="icon" title="Показати змінні теми" className="rounded-s-none border-s-0">
                        <CalculatorIcon className="h-4 w-4" />
                      </Button>
                    </div>
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
                    <Input {...field}
                      {...register(field.name, { setValueAs: (value) => Number(value) })}
                      className="w-full"
                      type="number"
                      step="any"
                      min={0}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>          
          <div>
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Зберегти
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )

}