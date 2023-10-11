import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/shadcn/ui/dialog';
import { Button } from '@/Components/shadcn/ui/button';
import { NewLandingForm } from '@/Components/Forms/NewLandingForm';
import { DialogClose } from '@radix-ui/react-dialog';
import { FormEventHandler, useRef } from 'react';

export const NewLandingModal = () => {
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
          <NewLandingForm />
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="ghost">Відмінити</Button>
          </DialogClose>
          <Button>Додати</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}