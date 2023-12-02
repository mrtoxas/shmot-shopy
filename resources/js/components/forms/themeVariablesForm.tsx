import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/shadcn/ui/form";
import { usePage } from '@inertiajs/react';
import { useLoader } from '@/hooks/useLoading';
import useLandingsStore from '@/store/landingsStore';
import { Input } from '../shadcn/ui/input';
import { Button } from '../shadcn/ui/button';
import { Loader2Icon } from 'lucide-react';
import { toast } from '../shadcn/ui/use-toast';
import { ThemeVariable } from "@/types";

const FormSchema = z.object({
  colors: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
      title: z.string().optional().nullable(),
      type: z.string()
    })),
  layouts: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
      title: z.string().optional().nullable(),
      type: z.string()
    })),
});

export const ThemeVariablesForm = () => {
  const { landingId } = usePage().props;
  const { startLoading, stopLoading, isLoading } = useLoader();
  const { currentLanding, templates, updateTemplateVariables } = useLandingsStore();
  const [templateVariables, setTemplateVariables] = useState<ThemeVariable[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const { handleSubmit, control, reset, formState: { isDirty } } = form;

  const { fields: colorFields } = useFieldArray({
    control,
    name: 'colors'
  });

  const { fields: layoutFields } = useFieldArray({
    control,
    name: 'layouts'
  });

  const uploadFields = (data: ThemeVariable[]) => {
    if (!data?.length) return;
    
    reset({
      colors: data.filter(e => e.type === 'color'),
      layouts: data.filter(e => e.type === 'layout')
    });
  }

  useEffect(() => {
    const userTemplate = currentLanding?.landing_settings?.template_name;

    if (!templates?.length && !userTemplate) return;

    const templateData = templates.find(item => item.name === userTemplate)?.variables;

    if (templateData?.length) setTemplateVariables(templateData);

    const userVariables = currentLanding?.landing_settings?.template_settings;

    if (userVariables?.length || templateData?.length) {
      uploadFields(JSON.parse(userVariables) || templateData);
    }
  }, [
    templates,
    currentLanding?.landing_settings?.template_name,
    currentLanding?.landing_settings?.template_settings
  ])

  const loadDefaultVariables = useCallback(() => {
    uploadFields(templateVariables);
  }, [templateVariables])

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    startLoading();
    const jsonData = JSON.stringify([...data.colors, ...data.layouts]);
    updateTemplateVariables(Number(landingId), jsonData).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading());
  }

  const preparedItems = useMemo(() => {
    if (!colorFields.length && !layoutFields.length) return;

    const colorVariables = colorFields.map((item, index) => {
      return (
        <FormField
          key={item.id}
          control={control}
          name={`colors.${index}.value`}
          render={({ field }) => {
            return (
              <FormItem className='space-y-0 border flex items-center justify-between p-2 rounded-sm'>
                <FormLabel>{item.name}</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type='color'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      )
    });

    const layoutVariables = layoutFields.map((item, index) => {
      return (
        <FormField
          key={item.id}
          control={control}
          name={`layouts.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{item.name}</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    });

    return (
      <div className='grid gap-4'>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colorVariables}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {layoutVariables}
        </div>
      </div>
    )
  }, [colorFields, layoutFields]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {preparedItems}
        <div className="mt-4 flex justify-between gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Зберегти
          </Button>
          <Button type="button" disabled={isLoading} variant="link" onClick={loadDefaultVariables}>
            Повернути початкові значення шаблону
          </Button>
        </div>
      </form>
    </Form>
  );
}