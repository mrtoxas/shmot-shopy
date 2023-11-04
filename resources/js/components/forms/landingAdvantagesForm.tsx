import { useEffect, useMemo, useState } from 'react';
import { Button } from '../shadcn/ui/button';
import useLandingsStore from '@/store/landingsStore';
import { usePage } from '@inertiajs/react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../shadcn/ui/form';
import { toast } from '../shadcn/ui/use-toast';
import { Input } from '../shadcn/ui/input';
import { ImageIcon, Loader2Icon } from '../ui/icons';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const FormSchema = z.object({
  advantages: z.array(
    z.object({
      caption: z.string().min(1, { message: 'Обов\'язкове поле' }),
      img_name: z.any().optional(),
      file: z.any().optional(),
    })
  ),
});

export const LandingAdvantagesForm = () => {
  const { landingId } = usePage().props;

  const { currentLanding, updateAdvantages } = useLandingsStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const { handleSubmit, setValue, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (currentLanding?.advantage) setValue('advantages', currentLanding?.advantage);
  }, [currentLanding?.advantage]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData();

    for (let index = 0; index < data.advantages.length; index++) {
      const item = data.advantages[index];

      formData.set(`caption[${index}]`, item.caption);
      formData.set(`file[${index}]`, item.file);

      if (!item.img_name && !item.file) {
        return toast({
          variant: "destructive",
          title: "Помилка!",
          description: "Додайте всі зображення Переваг!",
        })
      }
    }

    return updateAdvantages(Number(landingId), formData).then((res) => {
      toast({
        className: "bg-green-600 text-white",
        title: "Успіх!",
        description: res.data.message,
      })
    });
  }

  const renderImage = (value: string, alt: string) => {
    return (
      <div className='w-32 h-32 border border-2 border-input'>
        {value
          ? (
            <img
              src={value.startsWith('data:image/') && value.includes(';base64,')
                ? value
                : `${window.location.protocol}//${window.location.hostname}/storage/images/${value}`}
              alt={alt}
              className='block w-full h-full object-cover'
            />)
          : <div className='w-full h-full flex items-center justify-center'>
            <ImageIcon className="stroke-input h-[3rem] w-[3rem]" />
          </div>}
      </div>
    )
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: ControllerRenderProps["onChange"],
    index: number) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setValue(`advantages.${index}.img_name`, reader.result);
    }
    reader.readAsDataURL(file);

    return onChange(e.target.files?.[0])
  }

  const preparedList = useMemo(() => {
    if (!currentLanding?.advantage) return;

    const { advantage } = currentLanding;

    return [...Array(3)].map((_, index) => {
      const itemCaption = (advantage[index]) ? advantage[index].caption : "";

      return (
        <div key={index} className="grid grid-cols-[auto,1fr] gap-4">
          <FormField
            control={form.control}
            name={`advantages.${index}.img_name`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {renderImage(field.value, itemCaption)}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormField
              control={form.control}
              name={`advantages.${index}.caption`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Введiть перевагу" className="w-full" {...field} value={field.value || ""} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button asChild variant="outline" className='mt-2 cursor-pointer'>
              <label>Змiнити зображення
                <FormField
                  control={form.control}
                  name={`advantages.${index}.file`}
                  render={({ field: { onChange, ref, name, onBlur } }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="hidden" type="file" accept="image/*"
                          ref={ref}
                          name={name}
                          onBlur={onBlur}
                          onChange={(e) => handleImageChange(e, onChange, index)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </label>
            </Button>
          </div>
        </div>
      )
    })
  }, [!currentLanding?.advantage])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className='grid gap-8'>
          <div className='grid  lg:grid-cols-3 gap-6'>
            {preparedList}
          </div>
          <div>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Зберегти
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
