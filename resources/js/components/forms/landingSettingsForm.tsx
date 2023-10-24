import useLandingsStore from "@/store/landingsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { useEffect } from "react";
import { Checkbox } from "../shadcn/ui/checkbox";
import { toast } from "../shadcn/ui/use-toast";

const FormSchema = z.object({
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  is_pub: z.boolean().default(false).optional(),
  fb_pixel_key: z.string().nullable(),
  telegram_chat_id: z.string().nullable(),
  crm_api_key: z.string().nullable(),
  telegram_token: z.string().nullable(),
})

export const LandingSettingsForm = () => {
  const { landingId } = usePage().props;

  const { currentLanding, updateLandingSettings } = useLandingsStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (!currentLanding?.landing_settings) return;

    const { landing_settings } = currentLanding;    

    form.reset({
      meta_title: landing_settings.meta_title || "",
      meta_description: landing_settings.meta_description,
      is_pub: Boolean(landing_settings.is_pub),
      fb_pixel_key: landing_settings.fb_pixel_key,
      telegram_chat_id: landing_settings.telegram_chat_id,
      crm_api_key: landing_settings.crm_api_key,
      telegram_token: landing_settings.telegram_token,
    });
  }, [currentLanding]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {    
    updateLandingSettings(Number(landingId), data as App.Models.LandingSettings).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
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

          <div className="mt-4">
            <Button type="submit">Зберегти</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}