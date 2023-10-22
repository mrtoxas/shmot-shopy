import useLandingsStore from "@/store/landingsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcn/ui/form";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { useEffect, useState } from "react";
import { LandingSettings } from "@/types";

const FormSchema = z.object({
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
})

export const LandingSettingsForm = () => {
  const { landingId } = usePage().props;

  const { currentLanding } = useLandingsStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      meta_title: "",
      meta_description: "",
    }
  })

  useEffect(() => {
    if (!currentLanding) return;
    const { landing_settings } = currentLanding;
    form.reset({
      meta_title: landing_settings.meta_title || "",
      meta_description: landing_settings.meta_description || "",
    });

  }, [currentLanding])



  const onSubmit = (data: z.infer<typeof FormSchema>) => {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 pb-4">
          <FormField
            control={form.control}
            name="meta_title"
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
            name="meta_description"
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

          <div className="text-right">
            <Button type="submit">Додати</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}


/*
const FormSchema = z.object({
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  is_pub: z.boolean(),
  fb_pixel_key: z.string().nullable(),
  telegram_chat_id: z.string().nullable(),
  crm_api_key: z.string().nullable(),
  telegram_token: z.string().nullable(),
})

const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      meta_title: "",
      meta_description: currentLanding?.landing_settings.meta_description,
      is_pub: currentLanding?.landing_settings.is_pub,
      fb_pixel_key: currentLanding?.landing_settings.fb_pixel_key,
      telegram_chat_id: currentLanding?.landing_settings.telegram_chat_id,
      crm_api_key: currentLanding?.landing_settings.crm_api_key,
      telegram_token: currentLanding?.landing_settings.telegram_token
    }
  })
*/