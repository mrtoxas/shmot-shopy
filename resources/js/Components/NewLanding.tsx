import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/shadcn/ui/dialog';
import { Button } from '@/Components/shadcn/ui/button';
import { NewLandingForm } from '@/Components/Forms/NewLandingForm';
import { DialogClose } from '@radix-ui/react-dialog';
import { FormEventHandler, useRef } from 'react';
import { useForm } from "@inertiajs/react"
import { Label } from '@/Components/shadcn/ui/label'
import { Input } from '@/Components/shadcn/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/shadcn/ui/select';

export const NewLanding = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    clone: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(data)
    //post(route('landing.new'));
  };

  return (
    <Dialog>
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
        <div>
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
                  onChange={(e) => setData('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="clone" className="text-right">
                  Сайт для клонування
                </Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="ghost">Відмінити</Button>
              </DialogClose>
              <Button>Додати</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}