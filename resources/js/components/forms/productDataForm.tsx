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
import { useEffect, useState } from "react";
import { toast } from "@/components/shadcn/ui/use-toast";
import { CalculatorIcon, Loader2Icon } from "@/components/ui/icons";
import { useLoader } from "@/hooks/useLoading";

const FormSchema = z.object({
  sizes: z.string().nullable(),
  price: z.number().nullable(),
  discount: z.number().nullable(),
  discounted_price: z.number().nullable(),
  rest: z.number().nullable(),
})

export const ProductDataForm = () => {
  const { landingId, productId } = usePage().props;
  const { currentProduct, currentLanding, updateProductData } = useLandingsStore();
  const { startLoading, stopLoading, isLoading } = useLoader();
  const [formIsDisabled, setFormIsDisabled] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sizes: "",
      price: null,
      discount: null,
      discounted_price: null,
      rest: null,
    }
  });

  const { getValues, setValue, register } = form;

  useEffect(() => {
    if (!currentProduct?.product_data) return;

    const { product_data } = currentProduct;

    form.reset({
      sizes: product_data.sizes || "",
      price: product_data.price || null,
      discount: product_data.discount || null,
      discounted_price: product_data.discounted_price || null,
      rest: product_data.rest || null,
    });
  }, [currentProduct?.product_data]);

  const calcPriceDiscount = () => {
    const discount = getValues("discount");
    const price = getValues("price");

    if (!discount && price) setValue("discounted_price", price);
    if (discount && price) setValue("discounted_price", price - (discount / 100) * price);
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startLoading();

    const preparedData = {
      ...data,
      price: (data.price) ? Number(data.price.toFixed(2)) : null,
      discountedPrice: (data.discounted_price) ? Number(data.discounted_price.toFixed(2)) : null,
    }

    return updateProductData(
      Number(landingId),
      Number(productId),
      preparedData as unknown as App.Models.ProductData).then((res) => {
        toast({
          className: "bg-green-600 text-white",
          title: "Успіх!",
          description: res.data.message,
        })
      }).finally(() => stopLoading());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <FormField
              control={form.control}
              name="sizes"
              disabled={formIsDisabled}
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
              disabled={formIsDisabled}
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
              disabled={formIsDisabled}
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
              disabled={formIsDisabled}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цiна зі скидкою, грн.</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input {...field}
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
              disabled={formIsDisabled}
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
          {formIsDisabled && <p className="text-red-800 text-sm font-medium">Наразі використовуються дані Глобального продукту!</p>}
          
          <div className="">
            <Button disabled={isLoading || formIsDisabled} type="submit">
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Зберегти
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}