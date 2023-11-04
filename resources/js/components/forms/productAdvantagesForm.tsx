import { useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
  name: z.string().min(1),
  value: z.string().min(1),
})

export const ProductAdvantagesForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	 const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    	name: "",
      value: ""
    },
  })

	function handleSubmit(data: z.infer<typeof FormSchema>) {}

	return (
		<div>
			<Form {...form}>
	      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
	      	<Table>
					  <TableHeader>
					    <TableRow className="hover:bg-transparent">
					      <TableHead className="w-[50%] px-2">Назва</TableHead>
					      <TableHead className="w-[50%] px-2">Значення</TableHead>
					      <TableHead></TableHead>
					    </TableRow>
					  </TableHeader>
					  <TableBody>
					    <TableRow className="hover:bg-transparent">
					      <TableCell className="px-2">
					      	<FormField
					          control={form.control}
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
					      <TableCell className="px-2">
					      	<FormField
					          control={form.control}
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
					      <TableCell className="px-2">
					      	<Button variant="ghost" type="button" className="hover:text-red-600">
					      		<Trash2Icon className="h-4 w-4" />
					      	</Button>
					      </TableCell>
					    </TableRow>
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