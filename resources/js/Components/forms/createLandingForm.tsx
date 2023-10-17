import { useMemo } from "react"
import useStore from "@/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../shadcn/ui/form"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../shadcn/ui/select"


interface CreateLandingFormProps {
  finallyAction: () => void;
}

const FormSchema = z.object({
  name: z.string({
    required_error: "Назва обов'язкова",
    invalid_type_error: "Неправильний формат",
  }).min(3, {
    message: "Назва має містити принаймні 3 символи",
  }),
  clone: z.string({
    invalid_type_error: "Неправильний формат",
  }).optional(),
})

export const CreateLandingForm = (props: CreateLandingFormProps) => {

  const { landings, createLanding } = useStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    createLanding(data).then(() => props.finallyAction());
  }

  const cloneOptionsPrepared = useMemo(() => {
    return landings.map((item) => {
      return <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
    })
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 pb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Назва сайту (пiддомен)</FormLabel>
                <FormControl>
                  <Input className="w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сайт для клонування</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть сайт для клонування" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cloneOptionsPrepared}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}