import { useMemo } from "react"
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
} from "@/components/shadcn/ui/form"
import { Input } from "@/components/shadcn/ui/input"
import { Button } from "@/components/shadcn/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/shadcn/ui/select"
import { Loader2Icon } from "@/components/ui/icons"
import { toast } from "@/components/shadcn/ui/use-toast"
import useAppStore from "@/store/appStore"
import useLandingsStore from "@/store/landingsStore"
import { useLoader } from "@/hooks/useLoading"

interface CreateLandingFormProps {
  finallyAction: () => void;
}

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Назва обов'язкова",
      invalid_type_error: "Неправильний формат",
    })
    .min(3, {
      message: "Назва має містити принаймні 3 символи",
    }),
  clone: z
    .string({
      invalid_type_error: "Неправильний формат",
    })
    .optional(),
})

export const NewLandingForm = (props: CreateLandingFormProps) => {
  const { landings, createLanding } = useLandingsStore();

  const { startLoading, stopLoading, isLoading } = useLoader();

  const { newLandingCloneName } = useAppStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      clone: newLandingCloneName || ""
    }
  })  

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startLoading();

    const { name, clone } = data;

    return createLanding(name, clone).then((res) => {
      props.finallyAction();
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading());
  }

  const cloneOptionsPrepared = useMemo(() => landings.map((item) => (
    <SelectItem key={item.id} value={String(item.name)}>{item.name}</SelectItem>
  )), [landings]);

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
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сайт для клонування</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!landings.length}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть сайт для клонування" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="overflow-y-auto max-h-[20rem]">
                    {cloneOptionsPrepared}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Додати</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}