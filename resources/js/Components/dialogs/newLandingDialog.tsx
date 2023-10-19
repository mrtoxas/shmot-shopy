import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/dialog';
import useAppStore from '@/store/appStore';
import { NewLandingForm } from '@/components/forms/newLandingForm';

export const NewLandingDialog = () => {

  const { 
    isOpenNewLandingDialog,     
    toggleNewLandingDialog 
  } = useAppStore();

  const closeDialogHandler = () => toggleNewLandingDialog(false);

  return (
    <Dialog open={isOpenNewLandingDialog} onOpenChange={toggleNewLandingDialog}>     
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>Додати сайт</DialogTitle>
          <DialogDescription>            
            Cтворюйте новий сайт або клонуйте вже існуючий
          </DialogDescription>
        </DialogHeader>

        <NewLandingForm finallyAction={closeDialogHandler} />

      </DialogContent>
    </Dialog>
  )
}