import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { CreateButton } from "./CreateButton";
import { SearchBox } from "./SearchBox";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
}

export function SideMenu({ open, onClose }: SideMenuProps) {
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
                    <CreateButton />
                </div>
            </SheetContent>
        </Sheet>
    );
}
