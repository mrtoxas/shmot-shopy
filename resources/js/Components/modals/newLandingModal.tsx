import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';
import { Button } from '@/components/shadcn/ui/button';
import { CreateLandingForm } from "../forms/createLandingForm";

export const NewLanding = () => {
  const [open, setOpen] = useState(false);

  const closeDialogHandler = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Додати сайт</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Додати сайт</DialogTitle>
          <DialogDescription>
            Cтворюйте новий сайт або клонуйте вже існуючий
          </DialogDescription>
        </DialogHeader>

        <CreateLandingForm finallyAction={closeDialogHandler} />
      
      </DialogContent>
    </Dialog>
  )
}