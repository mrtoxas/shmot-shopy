import { useForm } from "@inertiajs/react"
import { FormEventHandler, useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/Components/shadcn/ui/dialog';
import { Button } from '@/Components/shadcn/ui/button';
import { Label } from '@/Components/shadcn/ui/label'
import { Input } from '@/Components/shadcn/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/Components/shadcn/ui/select';
import { FormError } from './ui/FormError';
import { DialogClose } from "@radix-ui/react-dialog";

export const NewLanding = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    name: '',
    clone: '',
  })

  const { data, setData, post, processing, errors, reset, clearErrors } = form;

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('landings.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();    
        setOpen(false);   
      },
    });
  };

  const nameChangeHandler = (data:React.ChangeEvent<HTMLInputElement>) => {
    setData('name', data.target.value);
    clearErrors();    
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Додати сайт</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Додати сайт</DialogTitle>
          <DialogDescription>
            За допомогою цієї форми ви можете створити новий сайт або клонувати вже існуючий
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name" className="text-right">
                Назва сайту (пiддомен)
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={data.name}
                className="col-span-3 mt-1"
                autoFocus={true}
                required
                onChange={nameChangeHandler}
              />
              <FormError msg={errors.name} />
            </div>
            <div>
              <Label htmlFor="clone" className="text-right">
                Сайт для клонування
              </Label>
              <Select onValueChange={(data) => setData('clone', data)} value={data.clone}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <FormError msg={errors.clone} />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="ghost">Відмінити</Button>
            </DialogClose>
            <Button disabled={processing}>Додати</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}