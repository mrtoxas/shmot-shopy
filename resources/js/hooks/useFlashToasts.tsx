import { useEffect } from "react";
import { toast } from "@/components/shadcn/ui/use-toast";
import { FlashProps } from "@/types";

export const useFlashToasts = (flash: FlashProps) => {
    useEffect(() => {
      if (flash) {
        const { success, error } = flash;
  
        let description = success || error;
  
        if (description) {
          toast({
            title: error ? "Помилка!" : "Успіх!",
            description,
            variant: error ? "destructive" : "default",
          });
        }
      }
    }, [flash]);
  };