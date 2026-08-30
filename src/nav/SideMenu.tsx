import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SearchBox } from "./SearchBox";

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
