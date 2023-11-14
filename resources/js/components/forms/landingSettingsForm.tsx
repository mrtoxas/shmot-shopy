import { useMemo, useState } from 'react';
import useLandingsStore from "@/store/landingsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { useEffect } from "react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { toast } from "@/components/shadcn/ui/use-toast";
import { BracesIcon, Loader2Icon } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select"
import { Textarea } from '../shadcn/ui/textarea';
import { Dialog } from '../ui/dialog';
import { TemplateVariables } from '../templateVariables';
import { useLoader } from '@/hooks/useLoading';

const FormSchema = z.object({
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  is_pub: z.boolean().default(false).optional(),
  fb_pixel_key: z.string().nullable(),
  telegram_chat_id: z.string().nullable(),
  crm_api_key: z.string().nullable(),
  telegram_token: z.string().nullable(),
  template_name: z.string().min(1, {
    message: 'Шаблон обов\'язковий'
  }),
  template_settings: z.string().nullable(),
  use_global_product: z.boolean().default(true)
})

export const LandingSettingsForm = () => {
  const { landingId } = usePage().props;

  const { startLoading, stopLoading, isLoading } = useLoader();

  const { currentLanding, updateLandingSettings, templates } = useLandingsStore();

  const [isOpenTemplateVarsDialog, setIsOpenTemplateVarsDialog] = useState(false);

  const templateVarsDialogToggle = () => setIsOpenTemplateVarsDialog((prevState) => !prevState);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      meta_title: null,
      meta_description: null,
      is_pub: false,
      fb_pixel_key: null,
      telegram_chat_id: null,
      crm_api_key: null,
      telegram_token: null,
      template_name: "",
      template_settings: null,
      use_global_product: true
    }
  });

  const { getValues } = form;  

  useEffect(() => {
    if (!currentLanding?.landing_settings) return;

    const { landing_settings } = currentLanding;

    form.reset({
      meta_title: landing_settings.meta_title,
      meta_description: landing_settings.meta_description,
      is_pub: Boolean(landing_settings.is_pub),
      fb_pixel_key: landing_settings.fb_pixel_key,
      telegram_chat_id: landing_settings.telegram_chat_id,
      crm_api_key: landing_settings.crm_api_key,
      telegram_token: landing_settings.telegram_token,
      template_name: String(landing_settings.template_name),
      template_settings: landing_settings.template_settings ? JSON.stringify(JSON.parse(landing_settings.template_settings), undefined, 2) : "",
      use_global_product: Boolean(landing_settings.use_global_product)
    });
  }, [currentLanding]);

  const themplatesOptions = useMemo(() => templates.map((item) => (
    <SelectItem key={item.name} value={item.name}>{item.title}</SelectItem>
  )), [currentLanding, templates]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    startLoading();

    return updateLandingSettings(Number(landingId), data as unknown as App.Models.LandingSettings).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    }).finally(() => stopLoading());
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
              <FormField
                control={form.control}
                name="meta_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мета заголовок</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meta_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мета опис</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fb_pixel_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Код fb pixel</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegram_chat_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram chat id</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="crm_api_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Код crm api</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegram_token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram токен</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="template_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Шаблон</FormLabel>
                      <div className='flex gap-2'>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {themplatesOptions}
                          </SelectContent>
                        </Select>
                        <Button onClick={templateVarsDialogToggle} type="button" variant="outline" size="icon" title="Показати змінні теми">
                          <BracesIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="is_pub"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Сайт опубліковано
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-4'>
              <FormField
                control={form.control}
                name="use_global_product"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Використовувати "Глобальний продукт".
                      </FormLabel>
                      <FormDescription>
                        При використанні цієї опції всі товари будуть використовувати дані, зазначені у формі "Глобальний продукт"
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-4'>
              <FormField
                control={form.control}
                name="template_settings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Налаштування теми</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px] whitespace-pre-wrap"
                        {...field}
                        value={field.value ? String(field.value) : ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Редагування змінних стилів шаблону. Вкажіть css-змінні шаблону у форматі json.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />} Зберегти
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <Dialog
        isOpen={isOpenTemplateVarsDialog}
        setIsOpen={templateVarsDialogToggle}
        body={<TemplateVariables templateName={getValues("template_name")} />}
        title={`Змінні теми`}
      />
    </>
  )
}