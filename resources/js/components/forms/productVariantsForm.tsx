import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Trash2Icon, PlusIcon } from "@/components/ui/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input"
import { Button } from "@/components/shadcn/ui/button"
import { Loader2Icon } from "@/components/ui/icons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/shadcn/ui/table";
import { usePage } from '@inertiajs/react';
import useLandingsStore from '@/store/landingsStore';
import { toast } from '../shadcn/ui/use-toast';
import { useLoader } from '@/hooks/useLoading';

const FormSchema = z.object({
  variants: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(1),
      value: z.string().min(1)
    })),
});

export const ProductVariantsForm = () => {
  const { landingId, productId } = usePage().props;

  const { currentProduct, updateProductVariants } = useLandingsStore(); 

  const { startLoading, stopLoading, isLoading } = useLoader();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const { handleSubmit, control, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants"
  });

  useEffect(() => {
    if (!currentProduct?.product_variants) return;
    reset({
      variants: currentProduct.product_variants
    });
  }, [currentProduct?.product_variants]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startLoading();

    updateProductVariants(Number(landingId), Number(productId), data.variants).then((res)=>{
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(()=>stopLoading());    
  }

  const handleAddItem = () => (append({ name: "", value: "" }));

  const handleRemoveItem = (index: number) => remove(index);

  const preparedItems = useMemo(() => {
    if (!fields.length) return (
      <TableRow className="hover:bg-transparent border-0">
        <TableCell colSpan={2} className="pl-1 pr-2 py-2">
          <p className="text-sm text-muted-foreground ">Не додано жодного варiанту</p>
        </TableCell>
      </TableRow>
    )

    return fields.map((_, index) => {
      return (
        <TableRow key={index} className="hover:bg-transparent border-0">
          <TableCell className="pl-1 pr-2 py-2">
            <FormField
              control={control}
              name={`variants.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required placeholder="Введiть перевагу" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
          <TableCell className="pl-2 pr-0 py-2">
            <FormField
              control={control}
              name={`variants.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required placeholder="Введiть перевагу" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
          <TableCell className="pl-2 pr-0 py-2">
            <Button onClick={() => handleRemoveItem(index)} variant="ghost" type="button" className="hover:text-red-600">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  }, [fields])

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Table>
            <TableHeader className="pb-4">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50%] pl-1 pr-2">Назва</TableHead>
                <TableHead className="w-[50%] pl-2 pr-0">Значення</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {preparedItems}
            </TableBody>
          </Table>
          <div className="mt-4 flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Зберегти
            </Button>
            <Button variant="secondary" type="button" onClick={handleAddItem}>
              <PlusIcon className="mr-2 h-4 w-4" /> Додати поле
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}