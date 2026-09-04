import { Button } from "@/components/ui/button.tsx";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet.tsx";
import { SearchBox } from "./SearchBox.tsx";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
    onCreate: () => void;
}

export function SideMenu({ open, onClose, onCreate }: SideMenuProps) {
    return (
        <Sheet
            open={open}
            onOpenChange={next => {
                if (!next) onClose();
            }}
        >
            <SheetContent side="left" className="w-72">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-3 p-4 pt-12">
                    <SearchBox />
                    <Button aria-haspopup="dialog" onClick={onCreate}>
                        Create
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
