import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";

export const CustomAlertDialog: React.FC<{
  buttonLabel: string;
  title: string;
  message: string;
  action: () => void;
  className?: string;
}> = ({ buttonLabel, title, message, action, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger className={className}>
        {buttonLabel}
      </AlertDialogTrigger>
      {isOpen &&
        createPortal(
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal</AlertDialogCancel>
              <AlertDialogAction className="bg-[#C75351]" onClick={action}>Evet</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>,
          document.body 
        )}
    </AlertDialog>
  );
};

export default CustomAlertDialog;
