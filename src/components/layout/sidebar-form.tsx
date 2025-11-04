import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Trash2 } from "lucide-react";

type SidebarFormProps = {
    buttonTitle: string;
    sheetTitle: string;
    description?: string
    children: ReactNode,
    onSave: () => void;
    onDelete?: () => void;
    loading: boolean;
}

export function SidebarForm({
    sheetTitle,
    description,
    children,
    onSave,
    onDelete,
    loading
}: SidebarFormProps) {
    const navigate = useNavigate()
    const location = useLocation()

    function handleCloseForm(open: boolean) {
        if (!open) {
            const currentPath = location.pathname;
            const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
            navigate(parentPath)
        }
    }

    return (
        <Sheet open={true} onOpenChange={handleCloseForm}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{description ?? 'Preencha os campos abaixo e clique em salvar.'}</SheetDescription>
                </SheetHeader>

                {children}

                <SheetFooter>
                    <div className="flex flex-row gap-1">
                        <Button 
                            type="button"
                            onClick={onSave}
                            disabled={loading}
                        >
                            Salvar
                        </Button>
                        <SheetClose asChild>
                            <Button 
                                variant='outline'
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                        </SheetClose>
                    </div>

                    {onDelete && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant='destructive'
                                    size='icon'
                                    onClick={onDelete}
                                >
                                    <Trash2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Remover o registro</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}