import { useState } from 'react';
import { useForm, useFieldArray, Validator } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Trash2Icon, PlusIcon } from "@/components/ui/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input"
import { Button, buttonVariants } from "@/components/shadcn/ui/button"
import { Loader2Icon } from "../ui/icons"
import { toast } from ".@/components/shadcn/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/shadcn/ui/table";


const FormSchema = z.object({
	items: z.array(z.object({
	  id: z.number(),
	  name: z.string().min(1),
	  value: z.string().min(1),
	})),
});

export const ProductAdvantagesForm = () => {
	const [data, setData] = useState({
		items: [
			{id: 1, name: 'name1', value: 'value1'},
			{id: 2, name: 'name2', value: 'value2'},
			{id: 3, name: 'name3', value: 'value3'}
		] 
	});

	const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const { handleSubmit, control, register, setValue, formState: { isSubmitting } } = form;

  const { fieldArray } = useFieldArray({
    name: 'items',
    defaultValue: data.items,
    register,
  });

  const preparedItems = useMemo(()=>{
  	return data.items.map((item, index)=>{
  		return (
  			<TableRow className="hover:bg-transparent">
					      <TableCell className="pl-0 pr-2">
					      	<FormField
					          control={item.control}
					          name="name"
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

  

	function onSubmit(data: z.infer<typeof FormSchema>) {}

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