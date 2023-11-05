import { useEffect, useMemo, useState } from 'react';
import { useForm } from "react-hook-form"
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

const fakeData: Partial<App.Models.ProductFeature>[] = [
  { id: 1, name: 'name1', value: 'value1' },
  { id: 2, name: 'name2', value: 'value2' },
  { id: 3, name: 'name3', value: 'value3' },
]

type DataType = { advantages: Partial<App.Models.ProductFeature>[] }

const FormSchema = z.object({
  advantages: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      value: z.string(),
    })),
});

export const ProductFeaturesForm = () => {
  const { landingId } = usePage().props;
  
  const [data, setData] = useState<DataType>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const { handleSubmit, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (fakeData) setValue('advantages', fakeData);
  }, [fakeData]);

  const preparedItems = useMemo(() => {
    return data.fields.map((item, index) => {
      return (
        <TableRow className="hover:bg-transparent">
          <TableCell className="pl-0 pr-2">
            <FormField
              control={control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Введiть перевагу" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
          <TableCell className="pl-2 pr-0">
            <FormField
              control={item.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Введiть значення" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
          <TableCell className="pl-2 pr-0">
            <Button variant="ghost" type="button" className="hover:text-red-600">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      )
    })
  }, [data])



  function onSubmit(data: z.infer<typeof FormSchema>) { }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50%] pl-0 pr-2">Назва</TableHead>
                <TableHead className="w-[50%] pl-2 pr-0">Значення</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {preparedItems}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between">
            <Button onClick={handleSubmit} type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Зберегти
            </Button>
            <Button variant="secondary">
              <PlusIcon className="mr-2 h-4 w-4" /> Додати поле
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}