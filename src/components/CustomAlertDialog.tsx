import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
export interface CustomAlertDialogProps {
    buttonLabel: string;
    message: string;
    title: string;
    className?: string;
    action: () => void;
}

export function CustomAlertDialog(props: CustomAlertDialogProps) {
    const { message, title, action, className, buttonLabel } = props;

    return (
        <AlertDialog>
            <AlertDialogTrigger className={className}>{buttonLabel}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>Evet</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
  