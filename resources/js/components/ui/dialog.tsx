import { Dispatch, SetStateAction } from 'react';
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/dialog';


interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  body: JSX.Element;
  title?: string;
  description?: string;
}

export const Dialog = (props: DialogProps) => {

  const {isOpen, setIsOpen, body, title} = props;

  const closeDialogHandler = () => setIsOpen(false);

  return (
    <ShadcnDialog open={isOpen} onOpenChange={setIsOpen}>     
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          {title && <DialogTitle className="mb-4">{title}</DialogTitle>}
          <DialogDescription asChild>            
            {body}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </ShadcnDialog>
  )
}